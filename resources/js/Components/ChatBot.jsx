import { fetchData } from "@/Helpers/fetch";
import React, { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ChatBot({ msgs, sessionId, setSessionId }) {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState(msgs);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [messages]);

    async function sendHandler() {
        try {
            setLoading(true);
            const data = await fetchData("/api/chatSend", "POST", {
                message: chatInput,
                chatId: sessionId,
            });
            // set new message
            if (data.result === "success") {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: data.user.message_id,
                        role: "user",
                        message: data.user.message,
                    },
                    {
                        id: data.bot.message_id,
                        role: "bot",
                        message: data.bot.message,
                    },
                ]);
                if (!sessionId) {
                    setSessionId(data.id);
                }
            }
            setLoading(false);
            setChatInput(""); // clear input after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    function displayMessages() {
        return messages.map((msg) => {
            const codeBlock = msg.message.match(/```(\w+)?\n([\s\S]*?)```/);
            if (codeBlock) {
                const language = codeBlock[1] || "javascript";
                const code = codeBlock[2];

                return (
                    <div
                        key={msg.id}
                        className={`max-w-[85%] md:max-w-xl px-1 py-1 mb-4 rounded-2xl text-sm shadow-sm transition-all duration-300 ${
                            msg.role === "user"
                                ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white self-end ml-auto rounded-tr-none"
                                : "bg-white text-gray-800 self-start mr-auto rounded-tl-none border border-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        }`}
                    >
                        <SyntaxHighlighter
                            language={language}
                            style={oneDark}
                            customStyle={{
                                borderRadius: "0.75rem",
                                padding: "1rem",
                                margin: "0",
                            }}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </div>
                );
            }

            // Fallback: normal text
            return (
                <div
                    key={msg.id}
                    className={`max-w-[80%] md:max-w-md px-4 py-3 mb-4 rounded-2xl text-sm shadow-sm transition-all duration-300 ${
                        msg.role === "user"
                            ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white self-end ml-auto rounded-tr-none"
                            : "bg-white text-gray-800 self-start mr-auto rounded-tl-none border border-gray-100 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                    }`}
                >
                    {msg.message}
                </div>
            );
        });
    }

    return (
        <div className="flex-1 flex flex-col min-h-0">
            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50 border border-gray-200/60 rounded-xl shadow-inner dark:bg-gray-950/30 dark:border-gray-800">
                {displayMessages()}
                {/* Bot typing indicator */}
                {loading && (
                    <div className="bg-white border border-gray-100 text-gray-400 px-4 py-3 mb-4 rounded-2xl rounded-tl-none text-sm w-fit animate-pulse dark:bg-gray-800 dark:border-gray-700 dark:text-gray-500">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="mt-4 p-2 pl-4 border border-gray-200/60 rounded-2xl bg-white shadow-sm flex items-center gap-2 dark:bg-gray-800 dark:border-gray-700">
                <input
                    type="text"
                    id="chat-input"
                    name="chat-input"
                    className="flex-1 border-none focus:ring-0 bg-transparent py-3 dark:text-gray-200"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendHandler()}
                />
                <button
                    onClick={sendHandler}
                    disabled={!chatInput.trim() || loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all duration-200 dark:bg-blue-600 dark:hover:bg-blue-500 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
