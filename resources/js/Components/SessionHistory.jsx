import React from "react";
import { router } from "@inertiajs/react";

export default function SessionHistory({ sessions = [], sessionId = null, onRemove }) {

    function displaySessions() {
        return sessions.map((session) => (
            <li
                key={session.id}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                    sessionId === session.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none"
                        : "hover:bg-gray-200/80 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
                }`}
            >
                <span
                    onClick={() =>
                        router.visit(`/chat-bot/${session.id}`)
                    }
                    className="flex-1 truncate pr-2 text-sm font-medium"
                >
                    {session.message}
                </span>
                <button
                    onClick={() => onRemove(session.id)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-red-500 hover:text-white ${
                        sessionId === session.id ? "text-blue-100" : "text-gray-400"
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                    </svg>
                </button>
            </li>
        ))
    }

    return (
        <div className="w-72 border-r border-gray-200 flex flex-col bg-gray-50/50 dark:bg-gray-900/50 dark:border-gray-800">
            {/* Header */}
            <div className="p-6 pb-2 font-bold text-lg text-gray-800 flex items-center dark:text-gray-100">
                Messages
            </div>

            {/* Session list */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1.5">
                    {displaySessions()}
                </ul>
            </div>

            {/* New Chat */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => router.visit('/chat-bot')}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl py-2.5 shadow-sm hover:bg-gray-50 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    New Chat
                </button>
            </div>
        </div>
    );
}
