import { MdOutlineHiking } from "react-icons/md";

interface LoadingProps {
    title?: string;
    message?: string;
}

export default function Loading({ title, message }: LoadingProps) {
    const displayTitle = title || "Loading Drops";
    const displayMessage = message || "Please wait while we prepare your sneaker experience...";

    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fafafc] text-slate-900 px-4 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#ee2b4b]/10 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-[420px] rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-10 text-center flex flex-col items-center gap-6">
                {/* Brand Badge */}
                <span className="rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#ee2b4b] border border-[#ee2b4b]/20">
                    FootStyle Drops
                </span>

                {/* Animated Logo / Spinner */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-16 w-16 rounded-2xl bg-[#ee2b4b]/10 animate-ping" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ee2b4b] to-[#ff4b6b] text-white">
                        <MdOutlineHiking className="text-3xl animate-bounce" />
                    </div>
                </div>

                {/* Text Information */}
                <div className="flex flex-col items-center gap-1.5">
                    <h2 className="text-lg font-black tracking-tight text-slate-900">
                        {displayTitle}
                    </h2>
                    <p className="text-xs font-semibold text-slate-500 max-w-[280px] leading-relaxed">
                        {displayMessage}
                    </p>
                </div>

                {/* Progress bar pulse line */}
                <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-gradient-to-r from-[#ee2b4b] to-[#ff4b6b] rounded-full animate-pulse w-full" />
                </div>
            </div>
        </main>
    );
}
