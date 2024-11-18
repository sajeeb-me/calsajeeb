import Image from "next/image";

import HeroImage from "@/public/better.png";
import HeroVideo from "@/public/calsajeeb.gif";
import { AuthModal } from "../AuthModal";


export function Hero() {
    return (
        <section className="relative flex items-center justify-center">
            <div className="relative items-center w-full py-12 lg:py-20">
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

                {/* <div className="relative items-center w-full py-12 mx-auto mt-12">
                    <svg
                        className="absolute inset-0 -mt-24 blur-3xl"
                        style={{ zIndex: -1 }}
                        fill="none"
                        viewBox="0 0 400 400"
                        height="100%"
                        width="100%"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_10_20)">
                            <g filter="url(#filter0_f_10_20)">
                                <path
                                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                                    fill="#FFA500"
                                ></path>
                                <path
                                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                                    fill="#FF8C00"
                                ></path>
                                <path
                                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                                    fill="#FF7F50"
                                ></path>
                                <path
                                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                                    fill="#FF4500"
                                ></path>
                            </g>
                        </g>
                        <defs>
                            <filter
                                colorInterpolationFilters="sRGB"
                                filterUnits="userSpaceOnUse"
                                height="720.666"
                                id="filter0_f_10_20"
                                width="720.666"
                                x="-160.333"
                                y="-160.333"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                <feBlend
                                    in="SourceGraphic"
                                    in2="BackgroundImageFix"
                                    mode="normal"
                                    result="shape"
                                ></feBlend>
                                <feGaussianBlur
                                    result="effect1_foregroundBlur_10_20"
                                    stdDeviation="80.1666"
                                ></feGaussianBlur>
                            </filter>
                        </defs>
                    </svg>

                    <Image
                        src={HeroImage}
                        alt="Hero image"
                        priority
                        className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
                    />
                </div> */}
            </div>
        </section >
    );
}