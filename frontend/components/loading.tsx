interface LoadingProps {
    title?: string;
    message?: string;
}

export default function Loading({ title, message }: LoadingProps) {
    const displayTitle = title || "Loading";
    const displayMessage = message || "Please wait while we prepare your page";

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-[480px] rounded-2xl">
                <div className="flex flex-col items-center gap-6">
                    {/* Spinner */}
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee2b4b]"></div>
                    </div>
                    {/* Text */}
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-gray-800">
                            {displayTitle}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            {displayMessage}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}