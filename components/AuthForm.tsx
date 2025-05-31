"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
    return (
        z.object({
            email: z.string().email(),
            fullName: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional()
        })
    );
};

const AuthForm = ({ type }: { type: FormType }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState(null);

    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const user = await createAccount({
                fullName: values.fullName || "",
                email: values.email
            });

            setAccountId(user.accountId);
        } catch {
            setErrorMessage("Failed to create account. Please try again.");
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="w-full max-w-[580px] flex flex-col lg:gap-8 gap-6"
                >
                    <h1 className="h1 text-light-100 max-lg:text-center">
                        {type === "sign-in" ? "Login" : "Create Account"}
                    </h1>

                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="bg-white p-4 shadow-1 rounded-xl space-y-1.5">
                                        <FormLabel className="!body-2 text-light-100">
                                            Full Name
                                        </FormLabel>

                                        <FormControl>
                                            <Input 
                                                placeholder="Enter Your Full Name" 
                                                {...field} 
                                                className="p-0 border-none outline-none shadow-none subtitle-2 placeholder:text-light-200 text-light-100"
                                            />
                                        </FormControl>
                                    </div>

                                    <FormMessage className="ml-4 caption text-accent-red" />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div className="bg-white p-4 shadow-1 rounded-xl space-y-1.5">
                                    <FormLabel className="!body-2 text-light-100">
                                        Email
                                    </FormLabel>

                                    <FormControl>
                                        <Input 
                                            placeholder="Enter Your Email" 
                                            {...field} 
                                            className="p-0 border-none outline-none shadow-none subtitle-2 placeholder:text-light-200 text-light-100"
                                        />
                                    </FormControl>
                                </div>

                                <FormMessage className="ml-4 caption text-accent-red" />
                            </FormItem>
                        )}
                    />

                    <Button 
                        type="submit"
                        className="bg-brand hover:bg-brand-100 py-6 h-auto !shadow-2 rounded-full transition-all"
                        disabled={isLoading}
                    >
                        <p className="button text-white">
                            {type === "sign-in" ? "Login" : "Create Account"}
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
                    </Button>

                    {errorMessage && (
                        <p className="bg-error/5 px-8 py-4 mx-auto rounded-xl body-2 text-error">
                            *{errorMessage}
                        </p>
                    )}

                    <div className="body-2 flex justify-center items-center gap-1">
                        <p className="text-light-100">
                            {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
                        </p>

                        <Link
                            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                            className="text-brand"
                        >
                            {type === "sign-in" ? "Create Account" : "Login"}
                        </Link>
                    </div>
                </form>
            </Form>

            {accountId && (
                <OTPModal 
                    email={form.getValues("email")}
                    accountId={accountId}
                />
            )}
        </>
    );
};

export default AuthForm;