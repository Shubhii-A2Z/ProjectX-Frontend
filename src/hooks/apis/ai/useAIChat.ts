import { useRef, useState } from "react";
import { type ChatMessageItem } from "@/components/organisms/ai/ChatMessage";

export const useAIChat = (initialModel = "deepseek-r1-distill-llama-70b") => {
    const [messages, setMessages] = useState<ChatMessageItem[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>(initialModel);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const stopStreaming = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setIsStreaming(false);
        setMessages((prev) =>
            prev.map((msg) => (msg.isStreaming ? { ...msg, isStreaming: false } : msg))
        );
    };

    const clearMessages = () => {
        stopStreaming();
        setMessages([]);
    };

    const sendMessage = async (prompt: string) => {
        if (!prompt.trim() || isStreaming) return;

        const userMessageId = `user-${Date.now()}`;
        const assistantMessageId = `assistant-${Date.now()}`;

        const newUserMessage: ChatMessageItem = {
            id: userMessageId,
            role: "user",
            content: prompt.trim()
        };

        const newAssistantMessage: ChatMessageItem = {
            id: assistantMessageId,
            role: "assistant",
            content: "",
            reasoning: selectedModel.includes("deepseek") ? "" : undefined,
            isStreaming: true,
            model: selectedModel
        };

        // Prepare updated messages payload
        const updatedMessages = [...messages, newUserMessage];
        setMessages([...updatedMessages, newAssistantMessage]);
        setIsStreaming(true);

        const startTime = Date.now();
        let fullRawText = "";
        let insideThink = false;
        let reasoningAccumulator = "";
        let contentAccumulator = "";

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";
            const response = await fetch(`${backendUrl}/api/v1/ai/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: updatedMessages.map((m) => ({
                        role: m.role,
                        content: m.content
                    })),
                    model: selectedModel
                }),
                signal: controller.signal
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || `Server responded with ${response.status}`);
            }

            if (!response.body) {
                throw new Error("No response body received");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                // Keep the last partial line in buffer
                buffer = lines.pop() || "";

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine.startsWith("data: ")) continue;

                    const dataStr = trimmedLine.slice(6).trim();
                    if (dataStr === "[DONE]") {
                        break;
                    }

                    try {
                        const parsed = JSON.parse(dataStr);
                        if (parsed.error) {
                            throw new Error(parsed.error);
                        }

                        const chunk: string = parsed.content || "";
                        fullRawText += chunk;

                        // Parse <think>...</think> tags if present
                        if (fullRawText.includes("<think>")) {
                            if (!insideThink && !fullRawText.includes("</think>")) {
                                insideThink = true;
                            }

                            if (fullRawText.includes("</think>")) {
                                const parts = fullRawText.split("</think>");
                                reasoningAccumulator = parts[0].replace("<think>", "").trim();
                                contentAccumulator = parts.slice(1).join("</think>").trimStart();
                                insideThink = false;
                            } else {
                                reasoningAccumulator = fullRawText.replace("<think>", "").trim();
                            }
                        } else {
                            contentAccumulator += chunk;
                        }

                        setMessages((prev) =>
                            prev.map((msg) =>
                                msg.id === assistantMessageId
                                    ? {
                                          ...msg,
                                          content: contentAccumulator,
                                          reasoning: reasoningAccumulator || (insideThink ? "..." : undefined),
                                          duration: Math.ceil((Date.now() - startTime) / 1000)
                                      }
                                    : msg
                            )
                        );
                    } catch {
                        // ignore malformed SSE line
                    }
                }
            }
        } catch (error: any) {
            if (error.name !== "AbortError") {
                const errorText = error.message || "Failed to generate AI response. Please check your GROQ_API_KEY in backend/.env.";
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === assistantMessageId
                            ? {
                                  ...msg,
                                  content: `⚠️ **Error**: ${errorText}`,
                                  isStreaming: false
                              }
                            : msg
                    )
                );
            }
        } finally {
            setIsStreaming(false);
            abortControllerRef.current = null;
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === assistantMessageId
                        ? {
                              ...msg,
                              isStreaming: false,
                              duration: Math.ceil((Date.now() - startTime) / 1000)
                          }
                        : msg
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

