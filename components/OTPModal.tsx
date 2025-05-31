import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";

const OTPModal = ({
    accountId,
    email
}: {
    accountId: string;
    email: string;
}) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const sessionId = await verifySecret({
                accountId,
                password
            });

            if(sessionId) router.push("/");
        } catch (error) {
            console.log("Failed to verify OTP", error);
        };

        setIsLoading(false);
    };

    const handleResendOTP = async () => {
        await sendEmailOTP({ email });
    };

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <AlertDialogContent className="bg-white min-w-[550px]">
                <Image
                    src="/assets/icons/close-dark.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain cursor-pointer absolute top-2 right-2"
                    onClick={() => setIsOpen(false)}
                />

                <AlertDialogHeader className="flex flex-col items-center gap-4">
                    <AlertDialogTitle className="!h2 text-light-100">
                        Enter OTP
                    </AlertDialogTitle>

                    <AlertDialogDescription className="body-2 text-light-100">
                        We&#39;ve sent a code to{" "}

                        <span className="text-brand">
                            {email}
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <InputOTP 
                    maxLength={6}
                    value={password}
                    onChange={setPassword}
                >
                    <InputOTPGroup className="w-full flex justify-between items-center gap-3">
                        <InputOTPSlot 
                            index={0} 
                            className="size-16 border-2 border-light-300 rounded-xl !shadow-1 !ring-brand font-medium text-[48px] leading-[60px] text-brand"
                        />
                        <InputOTPSlot 
                            index={1} 
                            className="size-16 border-2 border-light-300 rounded-xl !shadow-1 !ring-brand font-medium text-[48px] leading-[60px] text-brand"
                        />
                        <InputOTPSlot 
                            index={2} 
                            className="size-16 border-2 border-light-300 rounded-xl !shadow-1 !ring-brand font-medium text-[48px] leading-[60px] text-brand"
                        />
                        <InputOTPSlot 
                            index={3} 
                            className="size-16 border-2 border-light-300 rounded-xl !shadow-1 !ring-brand font-medium text-[48px] leading-[60px] text-brand"
                        />
                        <InputOTPSlot 
                            index={4} 
                            className="size-16 border-2 border-light-300 rounded-xl !shadow-1 !ring-brand font-medium text-[48px] leading-[60px] text-brand"
                        />
                        <InputOTPSlot 
                            index={5} 
                            className="size-16 border-2 border-light-300 rounded-xl !shadow-1 !ring-brand font-medium text-[48px] leading-[60px] text-brand"
                        />
                    </InputOTPGroup>
                </InputOTP>

                <AlertDialogFooter>
                    <div className="w-full flex flex-col items-center gap-5">
                        <AlertDialogAction
                            type="button"
                            className="w-full h-auto py-4 bg-brand hover:bg-brand-100 !shadow-2 rounded-full transition-all"
                            onClick={handleSubmit}
                        >
                            <p className="button text-white">
                                Submit
                            </p>

                            {isLoading && (
                                <Image
                                    src="/assets/icons/loader.svg"
                                    alt="loader"
                                    width={24}
                                    height={24}
                                    className="object-contain animate-spin"
                                />
                            )}
                        </AlertDialogAction>

                        <div className="flex items-center gap-1">
                            <p className="subtitle-2 text-light-100">
                                Didn&#39;t get a code?
                            </p>

                            <Button
                                type="button"
                                variant="link"
                                className="p-0 body-2 text-brand"
                                onClick={handleResendOTP}
                            >
                                Click to resend.
                            </Button>
                        </div>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default OTPModal;