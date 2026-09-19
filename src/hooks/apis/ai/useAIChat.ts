import { useRef, useState } from "react";

import { type ChatMessageItem } from "@/components/organisms/ai/ChatMessage";

export const useAIChat = (
    initialModel = "core"
) => {
    const [messages, setMessages] = useState<ChatMessageItem[]>([]);

    const [selectedModel, setSelectedModel] =
        useState<string>(initialModel);

    const [isStreaming, setIsStreaming] = useState(false);

    const abortControllerRef =
        useRef<AbortController | null>(null);

    const stopStreaming = () => {
        abortControllerRef.current?.abort();

        abortControllerRef.current = null;

        setIsStreaming(false);

        setMessages((previousMessages) =>
            previousMessages.map((message) =>
                message.isStreaming
                    ? {
                          ...message,
                          isStreaming: false
                      }
                    : message
            )
        );
    };

    const clearMessages = () => {
        stopStreaming();
        setMessages([]);
    };

    const sendMessage = async (prompt: string) => {
        const trimmedPrompt = prompt.trim();

        if (!trimmedPrompt || isStreaming) {
            return;
        }

        const userMessageId = `user-${Date.now()}`;

        const assistantMessageId =
            `assistant-${Date.now()}`;

        const userMessage: ChatMessageItem = {
            id: userMessageId,
            role: "user",
            content: trimmedPrompt
        };

        const assistantMessage: ChatMessageItem = {
            id: assistantMessageId,
            role: "assistant",
            content: "",
            isStreaming: true,

            /*
             * This is now the RelayAI model ID.
             *
             * Example:
             * "core"
             * "deep"
             */
            model: selectedModel
        };

        const updatedMessages = [
            ...messages,
            userMessage
        ];

        setMessages([
            ...updatedMessages,
            assistantMessage
        ]);

        setIsStreaming(true);

        const startTime = Date.now();

        const controller =
            new AbortController();

        abortControllerRef.current = controller;

        try {
            const backendUrl =
                import.meta.env.VITE_BACKEND_API_URL ||
                "http://localhost:3000";

            const response = await fetch(
                `${backendUrl}/api/v1/ai/chat`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        messages: updatedMessages.map(
                            (message) => ({
                                role: message.role,
                                content: message.content
                            })
                        ),

                        /*
                         * IMPORTANT:
                         *
                         * We send the RelayAI ID.
                         *
                         * "core"
                         * or
                         * "deep"
                         *
                         * The backend will convert this
                         * to the actual Groq model.
                         */
                        model: selectedModel
                    }),

                    signal: controller.signal
                }
            );

            if (!response.ok) {
                const errorData =
                    await response
                        .json()
                        .catch(() => ({}));

                throw new Error(
                    errorData.message ||
                        `Server responded with ${response.status}`
                );
            }

            if (!response.body) {
                throw new Error(
                    "No response body received"
                );
            }

            const reader =
                response.body.getReader();

            const decoder =
                new TextDecoder("utf-8");

            let buffer = "";

            let assistantContent = "";

            while (true) {
                const { done, value } =
                    await reader.read();

                if (done) {
                    break;
                }

                buffer += decoder.decode(value, {
                    stream: true
                });

                const lines =
                    buffer.split("\n");

                buffer =
                    lines.pop() || "";

                for (const line of lines) {
                    const trimmedLine =
                        line.trim();

                    if (
                        !trimmedLine.startsWith(
                            "data: "
                        )
                    ) {
                        continue;
                    }

                    const data =
                        trimmedLine
                            .slice(6)
                            .trim();

                    if (data === "[DONE]") {
                        break;
                    }

                    try {
                        const parsed: {
                            content?: string;
                            error?: string;
                        } = JSON.parse(data);

                        if (parsed.error) {
                            throw new Error(
                                parsed.error
                            );
                        }

                        const chunk =
                            parsed.content || "";

                        if (!chunk) {
                            continue;
                        }

                        assistantContent +=
                            chunk;

                        const duration =
                            Math.ceil(
                                (Date.now() -
                                    startTime) /
                                    1000
                            );

                        setMessages(
                            (previousMessages) =>
                                previousMessages.map(
                                    (message) =>
                                        message.id ===
                                        assistantMessageId
                                            ? {
                                                  ...message,
                                                  content:
                                                      assistantContent,
                                                  isStreaming:
                                                      true,
                                                  duration
                                              }
                                            : message
                                )
                        );
                    } catch (error) {
                        console.error(
                            "Failed to parse SSE message:",
                            error
                        );
                    }
                }
            }
        } catch (error: unknown) {
            if (
                error instanceof DOMException &&
                error.name === "AbortError"
            ) {
                return;
            }

            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to generate AI response.";

            setMessages(
                (previousMessages) =>
                    previousMessages.map(
                        (message) =>
                            message.id ===
                            assistantMessageId
                                ? {
                                      ...message,
                                      content: `⚠️ **Error:** ${errorMessage}`,
                                      isStreaming: false
                                  }
                                : message
                    )
            );
        } finally {
            setIsStreaming(false);

            abortControllerRef.current =
                null;

            const duration =
                Math.ceil(
                    (Date.now() - startTime) /
                        1000
                );

            setMessages(
                (previousMessages) =>
                    previousMessages.map(
                        (message) =>
                            message.id ===
                            assistantMessageId
                                ? {
                                      ...message,
                                      isStreaming: false,
                                      duration
                                  }
                                : message
                    )
            );
        }
    };

    return {
        messages,
        isStreaming,

        selectedModel,
        setSelectedModel,

        sendMessage,
        stopStreaming,
        clearMessages
    };
};