import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const isSubscribed = auth.user.subscription?.status === 'ACTIVE';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8 overflow-hidden bg-gray-100 shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700">
                        <div className="p-8 text-gray-900 dark:text-gray-100 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent">
                            <h3 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">Welcome back, {auth.user.name.split(' ')[0]}!</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Your AI-powered workspace is ready. Explore your data and start new conversations.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Chat Bot Card */}
                        <div className={`group flex flex-col overflow-hidden bg-gray-100 shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-900/50 ${!isSubscribed ? 'opacity-75 grayscale-[0.5]' : ''}`}>
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex items-center mb-6">
                                    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mr-4 relative transition-transform group-hover:scale-110">
                                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                                        </svg>
                                        {!isSubscribed && (
                                            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1.5 border-2 border-white dark:border-gray-800">
                                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Chat Bot</h4>
                                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Assistant</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                    Interact with your powerful AI assistant. Ask complex questions, get coding help, or just have a creative conversation.
                                </p>
                                <div className="mt-auto">
                                    {isSubscribed ? (
                                        <Link
                                            href={route('chatbot.index')}
                                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 border border-transparent rounded-xl font-bold text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                                        >
                                            Start Chatting
                                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('subscription.index')}
                                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-xl font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                                        >
                                            Unlock Feature
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Graphs/Analytics Card */}
                        <div className={`group flex flex-col overflow-hidden bg-gray-100 shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-900/50 ${!isSubscribed ? 'opacity-75 grayscale-[0.5]' : ''}`}>
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex items-center mb-6">
                                    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mr-4 relative transition-transform group-hover:scale-110">
                                        <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                        </svg>
                                        {!isSubscribed && (
                                            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1.5 border-2 border-white dark:border-gray-800">
                                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">Analytics</h4>
                                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">Insights</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                    Deep dive into your usage patterns. Monitor costs, message counts, and performance metrics over time.
                                </p>
                                <div className="mt-auto">
                                    {isSubscribed ? (
                                        <Link
                                            href={route('analytic.index')}
                                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-purple-600 border border-transparent rounded-xl font-bold text-sm text-white hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-200"
                                        >
                                            View Analysis
                                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('subscription.index')}
                                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-xl font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                                        >
                                            Unlock Feature
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Subscription Status Card */}
                        <div className="group flex flex-col overflow-hidden bg-gray-100 shadow-sm sm:rounded-2xl dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-900/50">
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex items-center mb-6">
                                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl mr-4 transition-transform group-hover:scale-110">
                                        <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">Plan Status</h4>
                                        <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">Account</span>
                                    </div>
                                </div>
                                <div className="mb-8">
                                    {auth.user.subscription ? (
                                        <div className="bg-green-50/50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-800/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-green-800 dark:text-green-400 uppercase tracking-wider">Active Plan</span>
                                                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                                            </div>
                                            <p className="text-xl font-extrabold text-green-900 dark:text-green-100">
                                                {auth.user.subscription.plan_type?.name}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="bg-amber-50/50 dark:bg-amber-900/10 p-5 rounded-2xl border border-amber-100 dark:border-amber-800/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">No Active Plan</span>
                                                <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
                                            </div>
                                            <p className="text-xl font-extrabold text-amber-900 dark:text-amber-100">
                                                Unsubscribed
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-auto">
                                    <Link
                                        href={route('subscription.index')}
                                        className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 border border-transparent rounded-xl font-bold text-sm text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all duration-200"
                                    >
                                        {auth.user.subscription ? 'Manage Plan' : 'View Pricing'}
                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
