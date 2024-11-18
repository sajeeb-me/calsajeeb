import Image from "next/image";
import HeroVideo from "@/public/calsajeeb.gif";
import { AuthModal } from "../AuthModal";


export function Hero() {
    return (
        <section className="w-full py-12 lg:py-20">
            <h1 className="text-center mt-4 text-5xl md:text-7xl lg:text-8xl font-medium leading-none">
                Seamless scheduling{" "}
                <span className="block text-primary">at your fingertips!</span>
            </h1>
            <div className="flex flex-col-reverse md:flex-row items-center md:gap-5 mt-4 md:mt-8">
                <div className="md:flex-1 p-0 w-full md:p-8">
                    <Image
                        src={HeroVideo}
                        alt="Hero image"
                        className="object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
                    />
                </div>
                <div className="md:flex-1 text-center md:text-left">
                    <p className="max-w-md lg:text-xl text-muted-foreground">
                        Simplify your scheduling process with CalSajeeb, making it effortless for clients to book meetings with you.
                    </p>
                    <div className=" mt-5 mb-12">
                        <AuthModal />
                    </div>
                </div>
            </div>
        </section >
    );
}