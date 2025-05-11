
const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-green-100">
            <div className="relative w-40 h-40 mb-6">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-4 border-dotted border-yellow-500"></div>
                <div className="absolute inset-4 animate-spin-reverse-slower rounded-full border-4 border-dotted border-green-600"></div>
                <div className="absolute inset-10 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-yellow-600 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 2l2.5 6h6l-4.5 4 2 6-5.5-4-5.5 4 2-6-4.5-4h6z"
                        />
                    </svg>
                </div>
            </div>

            <div className="text-3xl font-semibold text-green-700 animate-pulse tracking-wider">
                Sabr...
            </div>
        </div>
    );
};

export default Loading;
