"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

type AuthFormProps = "sign-in" | "sign-up"

const authFormSchema = (formType: AuthFormProps) => {
    return z.object({
        email: z.string().email(),
        fullName: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional()
    })
}

const AuthForm = ({ type }: { type: AuthFormProps }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-[580px] flex flex-col lg:gap-8 gap-6"
                >
                    <h1 className="h1 text-light-100 max-md:text-center">
                        {type === "sign-in" ? "Login" : "Create Account"}
                    </h1>

                    {type === "sign-up" && (
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-[6px]">
                                    <div className="p-4 shadow-1 rounded-xl space-y-[6px]">
                                        <FormLabel className="!body-2 text-light-100">
                                            Full Name
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Enter your full name"
                                                {...field}
                                                className="p-0 border-none outline-none shadow-none subtitle-2 placeholder:text-light-200 text-light-200"
                                            />
                                        </FormControl>
                                    </div>

                                    <FormMessage className="ml-4 !caption text-accent-red" />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-[6px]">
                                <div className="p-4 border border-light-300 shadow-1 rounded-xl space-y-[6px]">
                                    <FormLabel className="!body-2 text-light-100">
                                        Email
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                            className="p-0 border-none outline-none shadow-none subtitle-2 placeholder:text-light-200 text-light-200"
                                        />
                                    </FormControl>
                                </div>

                                <FormMessage className="ml-4 !caption text-accent-red" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="h-auto py-6 bg-brand-100 hover:bg-brand-200 !shadow-2 rounded-full transition-all"
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
                        <p className="bg-error/5 mx-auto px-8 py-4 rounded-xl body-2 text-error">
                            *{errorMessage}
                        </p>
                    )}

                    <div className="body-2 flex justify-center gap-1">
                        <p className="text-light-100">
                            {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
                        </p>

                        <Link
                            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                            className="text-brand-100"
                        >
                            {type === "sign-in" ? "Create Account" : "Login"}
                        </Link>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default AuthForm