export default function Loading() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-[480px] rounded-2xl">
                <div className="flex flex-col items-center gap-6">
                    {/* Spinner */}
                    <div className="h-12 w-12 rounded-full border-4 border-[#ee2b4b]/20 border-t-[#ee2b4b] animate-spin" />

                    {/* Text */}
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-gray-800">
                            Loading
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Please wait while we prepare your page
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}