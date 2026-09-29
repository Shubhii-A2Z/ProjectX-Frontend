import { useCallback, useRef, useState } from "react";

import {
    AI_THINKING_CONFIG,
    type AIThinkingPhase,
    getThinkingDelay,
} from "@/components/organisms/ai/ai-thinking.data";
import type { ChatMessageItem } from "@/components/organisms/ai/ChatMessage";

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000"}/api/v1/ai/chat`;

const THINKING_LABELS: Record<
    AIThinkingPhase,
    string
> = Object.fromEntries(
    AI_THINKING_CONFIG.phases.map((phase) => [
        phase.id,
        phase.label,
    ])
) as Record<AIThinkingPhase, string>;

const waitWithAbort = (
    duration: number,
    signal: AbortSignal
): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (signal.aborted) {
            reject(
                new DOMException(
                    "Request aborted",
                    "AbortError"
                )
            );

            return;
        }

        let timeoutId: number;

        const cleanup = () => {
            window.clearTimeout(timeoutId);

            signal.removeEventListener(
                "abort",
                handleAbort
            );
        };

        const handleAbort = () => {
            cleanup();

            reject(
                new DOMException(
                    "Request aborted",
                    "AbortError"
                )
            );
        };

        timeoutId = window.setTimeout(() => {
            cleanup();
            resolve();
        }, duration);

        signal.addEventListener(
            "abort",
            handleAbort,
            { once: true }
        );
    });
};

export const useAIChat = (
    initialModel = "core"
) => {
    const [messages, setMessages] =
        useState<ChatMessageItem[]>([]);

    const [selectedModel, setSelectedModel] =
        useState<string>(initialModel);

    const [isStreaming, setIsStreaming] =
        useState(false);

    const [isThinking, setIsThinking] =
        useState(false);

    const [thinkingPhase, setThinkingPhase] =
        useState<AIThinkingPhase | null>(null);

    const abortControllerRef =
        useRef<AbortController | null>(null);

    const runThinkingPhase = useCallback(
        async (signal: AbortSignal) => {
            setIsThinking(true);

            const totalDelay =
                getThinkingDelay();

            const startedAt = Date.now();

            for (
                let index = 0;
                index <
                AI_THINKING_CONFIG.phases.length;
                index++
            ) {
                const phase =
                    AI_THINKING_CONFIG.phases[index];

                setThinkingPhase(phase.id);

                const remainingPhases =
                    AI_THINKING_CONFIG.phases
                        .slice(index);

                const remainingWeight =
                    remainingPhases.reduce(
                        (sum, item) =>
                            sum + item.weight,
                        0
                    );

                const phaseDuration = Math.max(
                    400,
                    Math.round(
                        totalDelay *
                            (phase.weight /
                                remainingWeight)
                    )
                );

                const elapsed =
                    Date.now() - startedAt;

                const remainingTime =
                    totalDelay - elapsed;

                if (remainingTime <= 0) {
                    break;
                }

                await waitWithAbort(
                    Math.min(
                        phaseDuration,
                        remainingTime
                    ),
                    signal
                );
            }

            const elapsed =
                Date.now() - startedAt;

            const remaining =
                totalDelay - elapsed;

            if (remaining > 0) {
                await waitWithAbort(
                    remaining,
                    signal
                );
            }

            setThinkingPhase(null);
            setIsThinking(false);
        },
        []
    );

    const stopStreaming = useCallback(() => {
        abortControllerRef.current?.abort();

        abortControllerRef.current = null;

        setIsThinking(false);
        setThinkingPhase(null);
        setIsStreaming(false);

        setMessages((current) =>
            current.map((message) =>
                message.isStreaming
                    ? {
                          ...message,
                          isStreaming: false,
                      }
                    : message
            )
        );
    }, []);

    const clearMessages = useCallback(() => {
        abortControllerRef.current?.abort();

        abortControllerRef.current = null;

        setMessages([]);

        setIsThinking(false);
        setThinkingPhase(null);
        setIsStreaming(false);
    }, []);

    const sendMessage = useCallback(
        async (content: string) => {
            const trimmedContent =
                content.trim();

            if (!trimmedContent) {
                return;
            }

            if (isStreaming) {
                return;
            }

            const userMessage: ChatMessageItem = {
                id: crypto.randomUUID(),
                role: "user",
                content: trimmedContent,
            };

            const assistantMessageId =
                crypto.randomUUID();

            const assistantMessage: ChatMessageItem =
                {
                    id: assistantMessageId,
                    role: "assistant",
                    content: "",
                    isStreaming: true,
                    model: selectedModel,
                };

            setMessages((current) => [
                ...current,
                userMessage,
                assistantMessage,
            ]);

            const controller =
                new AbortController();

            abortControllerRef.current =
                controller;

            setIsStreaming(true);

            const thinkingStartedAt =
                Date.now();

            try {
                /*
                 * --------------------------------------------------
                 * THINKING PHASE
                 * --------------------------------------------------
                 */

                await runThinkingPhase(
                    controller.signal
                );

                /*
                 * --------------------------------------------------
                 * SSE REQUEST
                 * --------------------------------------------------
                 */

                const response = await fetch(
                    API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            messages: [
                                ...messages
                                    .filter(
                                        (message) =>
                                            message.role ===
                                                "user" ||
                                            message.role ===
                                                "assistant"
                                    )
                                    .map(
                                        ({
                                            role,
                                            content,
                                        }) => ({
                                            role,
                                            content,
                                        })
                                    ),

                                {
                                    role: "user",
                                    content:
                                        trimmedContent,
                                },
                            ],

                            model: selectedModel,
                        }),

                        signal:
                            controller.signal,
                    }
                );

                if (!response.ok) {
                    const errorText =
                        await response.text();

                    throw new Error(
                        errorText ||
                            `Request failed with status ${response.status}`
                    );
                }

                if (!response.body) {
                    throw new Error(
                        "The AI response body is empty."
                    );
                }

                const reader =
                    response.body.getReader();

                const decoder =
                    new TextDecoder();

                let buffer = "";

                let assistantContent = "";

                let reasoningContent = "";

                const thinkingDuration =
                    Date.now() -
                    thinkingStartedAt;

                while (true) {
                    const {
                        value,
                        done,
                    } = await reader.read();

                    if (done) {
                        break;
                    }

                    buffer += decoder.decode(
                        value,
                        {
                            stream: true,
                        }
                    );

                    const events =
                        buffer.split("\n");

                    buffer =
                        events.pop() ?? "";

                    for (const line of events) {
                        const trimmedLine =
                            line.trim();

                        if (!trimmedLine) {
                            continue;
                        }

                        if (
                            !trimmedLine.startsWith(
                                "data:"
                            )
                        ) {
                            continue;
                        }

                        const data =
                            trimmedLine
                                .slice(5)
                                .trim();

                        if (!data) {
                            continue;
                        }

                        if (data === "[DONE]") {
                            continue;
                        }

                        let chunk = "";

                        try {
                            const parsed =
                                JSON.parse(data);

                            /*
                             * Supports common SSE
                             * response shapes.
                             */

                            if (
                                typeof parsed ===
                                "string"
                            ) {
                                chunk = parsed;
                            } else if (
                                typeof parsed.content ===
                                "string"
                            ) {
                                chunk =
                                    parsed.content;
                            } else if (
                                typeof parsed.delta ===
                                "string"
                            ) {
                                chunk =
                                    parsed.delta;
                            } else if (
                                typeof parsed?.choices?.[0]
                                    ?.delta?.content ===
                                "string"
                            ) {
                                chunk =
                                    parsed.choices[0]
                                        .delta.content;
                            }
                        } catch {
                            /*
                             * Some SSE servers send
                             * plain text after data:
                             */

                            chunk = data;
                        }

                        if (!chunk) {
                            continue;
                        }

                        /*
                         * ------------------------------------------
                         * REASONING
                         * ------------------------------------------
                         */

                        if (
                            chunk.includes(
                                "<think>"
                            ) ||
                            reasoningContent
                        ) {
                            const thinkStart =
                                chunk.indexOf(
                                    "<think>"
                                );

                            const thinkEnd =
                                chunk.indexOf(
                                    "</think>"
                                );

                            if (
                                thinkStart !== -1
                            ) {
                                const afterStart =
                                    chunk.slice(
                                        thinkStart +
                                            "<think>"
                                                .length
                                    );

                                if (
                                    thinkEnd !==
                                    -1
                                ) {
                                    reasoningContent +=
                                        afterStart.slice(
                                            0,
                                            thinkEnd -
                                                thinkStart -
                                                "<think>"
                                                    .length
                                        );
                                } else {
                                    reasoningContent +=
                                        afterStart;
                                }
                            } else if (
                                thinkEnd !== -1
                            ) {
                                const beforeEnd =
                                    chunk.slice(
                                        0,
                                        thinkEnd
                                    );

                                reasoningContent +=
                                    beforeEnd;
                            } else {
                                reasoningContent +=
                                    chunk;
                            }

                            if (
                                thinkEnd !== -1
                            ) {
                                const afterThink =
                                    chunk.slice(
                                        thinkEnd +
                                            "</think>"
                                                .length
                                    );

                                if (
                                    afterThink
                                ) {
                                    assistantContent +=
                                        afterThink;
                                }
                            }

                            setMessages(
                                (current) =>
                                    current.map(
                                        (
                                            message
                                        ) =>
                                            message.id ===
                                            assistantMessageId
                                                ? {
                                                      ...message,
                                                      content:
                                                          assistantContent,
                                                      reasoning:
                                                          reasoningContent,
                                                      duration:
                                                          thinkingDuration,
                                                  }
                                                : message
                                    )
                            );

                            continue;
                        }

                        /*
                         * ------------------------------------------
                         * NORMAL RESPONSE
                         * ------------------------------------------
                         */

                        assistantContent +=
                            chunk;

                        setMessages(
                            (current) =>
                                current.map(
                                    (message) =>
                                        message.id ===
                                        assistantMessageId
                                            ? {
                                                  ...message,
                                                  content:
                                                      assistantContent,
                                                  reasoning:
                                                      reasoningContent ||
                                                      undefined,
                                                  duration:
                                                      thinkingDuration,
                                              }
                                            : message
                                )
                        );
                    }
                }

                /*
                 * Flush any remaining decoder data.
                 */

                buffer += decoder.decode();

                const finalData =
                    buffer.trim();

                if (
                    finalData.startsWith(
                        "data:"
                    )
                ) {
                    const data =
                        finalData
                            .slice(5)
                            .trim();

                    if (
                        data &&
                        data !== "[DONE]"
                    ) {
                        let finalChunk =
                            "";

                        try {
                            const parsed =
                                JSON.parse(data);

                            if (
                                typeof parsed ===
                                "string"
                            ) {
                                finalChunk =
                                    parsed;
                            } else if (
                                typeof parsed.content ===
                                "string"
                            ) {
                                finalChunk =
                                    parsed.content;
                            } else if (
                                typeof parsed.delta ===
                                "string"
                            ) {
                                finalChunk =
                                    parsed.delta;
                            } else if (
                                typeof parsed
                                    ?.choices?.[0]
                                    ?.delta
                                    ?.content ===
                                "string"
                            ) {
                                finalChunk =
                                    parsed.choices[0]
                                        .delta
                                        .content;
                            }
                        } catch {
                            finalChunk = data;
                        }

                        if (finalChunk) {
                            assistantContent +=
                                finalChunk;

                            setMessages(
                                (current) =>
                                    current.map(
                                        (
                                            message
                                        ) =>
                                            message.id ===
                                            assistantMessageId
                                                ? {
                                                      ...message,
                                                      content:
                                                          assistantContent,
                                                      reasoning:
                                                          reasoningContent ||
                                                          undefined,
                                                      duration:
                                                          thinkingDuration,
                                                  }
                                                : message
                                    )
                            );
                        }
                    }
                }

                setMessages(
                    (current) =>
                        current.map(
                            (message) =>
                                message.id ===
                                assistantMessageId
                                    ? {
                                          ...message,
                                          content:
                                              assistantContent,
                                          reasoning:
                                              reasoningContent ||
                                              undefined,
                                          duration:
                                              thinkingDuration,
                                          isStreaming:
                                              false,
                                      }
                                    : message
                        )
                );
            } catch (error) {
                if (
                    error instanceof
                        DOMException &&
                    error.name ===
                        "AbortError"
                ) {
                    return;
                }

                console.error(
                    "RelayAI error:",
                    error
                );

                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while generating the response.";

                setMessages(
                    (current) =>
                        current.map(
                            (message) =>
                                message.id ===
                                assistantMessageId
                                    ? {
                                          ...message,
                                          content:
                                              errorMessage,
                                          isStreaming:
                                              false,
                                      }
                                    : message
                        )
                );
            } finally {
                setIsThinking(false);
                setThinkingPhase(null);
                setIsStreaming(false);

                abortControllerRef.current =
                    null;
            }
        },
        [
            isStreaming,
            messages,
            runThinkingPhase,
            selectedModel,
        ]
    );

    return {
        messages,

        selectedModel,
        setSelectedModel,

        isStreaming,

        isThinking,

        thinkingPhase,

        thinkingLabel: thinkingPhase
            ? THINKING_LABELS[thinkingPhase]
            : null,

        sendMessage,

        stopStreaming,

        clearMessages,
    };
};