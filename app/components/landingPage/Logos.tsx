import Image from "next/image";
import NylasLogo from "@/public/nylas-logo.png";
import NextjsLogo from "@/public/nextjs-logo.svg";
import vercelLogo from "@/public/vercel.svg";
import Marquee from "react-fast-marquee";

export function Logos() {
    return (
        <div className="py-10">
            <h2 className="text-center text-lg font-semibold leading-7">
                Proudly partnered with industry-leading innovators
            </h2>
            <Marquee>
                <div className="mt-10 max-w-lg mx-auto sm:max-w-x lg:mx-0 lg:max-w-none flex gap-x-14 overflow-hidden">
                    <Image
                        src={NylasLogo}
                        alt="Logo"
                        className="col-span-2 max-h-7 md:max-h-12 w-full object-contain lg:col-span-1 dark:invert"
                    />
                    <Image
                        src={NextjsLogo}
                        alt="Logo"
                        className="col-span-2 max-h-7 md:max-h-12 w-full object-contain lg:col-span-1 dark:invert"
                    />
                    <Image
                        src={vercelLogo}
                        alt="Logo"
                        className="col-span-2 max-h-7 md:max-h-12 w-full object-contain lg:col-span-1 dark:invert"
                    />
                    <Image
                        src={NylasLogo}
                        alt="Logo"
                        className="col-span-2 max-h-7 md:max-h-12 w-full object-contain lg:col-span-1 dark:invert"
                    />
                    <Image
                        src={NextjsLogo}
                        alt="Logo"
                        className="col-span-2 max-h-7 md:max-h-12 w-full object-contain lg:col-span-1 dark:invert"
                    />
                </div>
            </Marquee>
        </div>
    );
}