import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";

export function AuthModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Try for free</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader className="flex-row justify-center items-center gap-x-2">
                    <Image src={Logo} alt="Logo" className="size-10" />
                    <h4 className="text-3xl font-semibold">
                        Cal<span className="text-primary">Sajeeb</span>
                    </h4>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}