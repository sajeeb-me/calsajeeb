import { Button } from "@/components/ui/button";
import { AuthModal } from "../AuthModal";

export function CTA() {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-20">
            <div className="relative isolate overflow-hidden  px-6 py-20 text-center sm:rounded-3xl sm:border  sm:px-16 sm:shadow-sm">
                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight  sm:text-4xl">
                    Start using CalSajeeb Now!
                </h2>
                <h3 className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                    Join thousands of users who are scheduling smarter, not harder.
                </h3>
                <div className="mt-8 flex items-center justify-center gap-x-6">
                    <AuthModal />
                </div>
                {/* gradient svg */}
                <svg
                    viewBox="0 0 1024 1024"
                    className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                    aria-hidden="true"
                >
                    <circle
                        cx={512}
                        cy={512}
                        r={512}
                        fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                        fillOpacity="0.7"
                    ></circle>
                    <defs>
                        <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                            <stop stopColor="#f97316" />
                            <stop offset={1} stopColor="#ea580c" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}