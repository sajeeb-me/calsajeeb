import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { AuthModal } from "./AuthModal";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
    return (
        <div className="sticky top-0 z-30 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black/50 bg-opacity-30 backdrop-blur-md">
            <div className="max-w-7xl flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
                <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
                    <Link href="/" className="flex items-center gap-0.5 md:gap-2">
                        <Image src={Logo} className="size-5 md:size-10" alt="Logo" />

                        <h4 className="text-base md:text-3xl font-semibold">
                            Cal<span className="text-primary">Sajeeb</span>
                        </h4>
                    </Link>
                    <div className="md:hidden">
                        <ThemeToggle />
                    </div>
                </div>

                <nav className="hidden md:flex md:justify-end md:space-x-4">
                    <ThemeToggle />

                    <AuthModal />
                </nav>
            </div>
        </div>
    );
}