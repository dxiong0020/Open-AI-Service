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
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function sendHandler() {
        try {
            setLoading(true);
            const response = await fetch("/chat-bot/api/chatSend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify({ message: chatInput, chatId: sessionId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // set new message
            const data = await response.json();
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
                        className={`max-w-xl px-4 py-2 mb-2 rounded-lg text-sm whitespace-pre-wrap ${
                            msg.role === "user"
                                ? "bg-blue-500 text-white self-end ml-auto"
                                : "bg-gray-200 text-gray-800 self-start mr-auto"
                        }`}
                    >
                        <SyntaxHighlighter
                            language={language}
                            style={oneDark}
                            customStyle={{
                                borderRadius: "0.5rem",
                                padding: "1rem",
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
                    className={`max-w-xs px-4 py-2 mb-2 rounded-lg text-sm ${
                        msg.role === "user"
                            ? "bg-blue-500 text-white self-end ml-auto"
                            : "bg-gray-200 text-gray-800 self-start mr-auto"
                    }`}
                >
                    {msg.message}
                </div>
            );
        });
    }

    return (
        <div className="flex-1 flex flex-col">
            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {displayMessages()}
                {/* Bot typing indicator */}
                {loading && (
                    <div className="bg-gray-300 text-gray-700 px-4 py-2 mb-2 rounded-lg text-sm w-fit animate-pulse">
                        ...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t bg-white flex items-center gap-2">
                <input
                    type="text"
                    id="chat-input"
                    name="chat-input"
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendHandler()}
                />
                <button
                    onClick={sendHandler}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
