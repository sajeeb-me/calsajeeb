import { Check, CloudRain, Fingerprint, UserRoundPen } from "lucide-react";

const features = [
    {
        name: "Sign up for free",
        description: "Get started with CalSajeeb for free. No credit card required.",
        icon: UserRoundPen,
    },
    {
        name: "Balzing fast",
        description: "CalSajeeb is built with the latest technologies to make it blazing fast.",
        icon: CloudRain,
    },
    {
        name: "Super secure with Nylas",
        description: "CalSajeeb uses Nylas to securely connect to your calendar.",
        icon: Fingerprint,
    },
    {
        name: "Easy to use",
        description: "CalSajeeb is easy to use and your clients will love it.",
        icon: Check,
    },
];

export function Features() {
    return (
        <div className="py-24 ">
            <div className="max-w-2xl mx-auto lg:text-center">
                <p className="font-semibold leading-7 text-primary">Schedule faster</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Schedule meetings in minutes
                </h1>
                <p className="mt-6 text-base leading-snug text-muted-foreground">
                    With CalSajeeb, you can schedule meetings with your clients in minutes. No more back and forth emails. Just send your link and let your clients pick a time that works for them.
                </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-16">
                            <div className="text-base font-semibold leading-7">
                                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                {feature.name}
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground leading-snug">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}