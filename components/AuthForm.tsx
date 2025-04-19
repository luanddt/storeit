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

type FormType = "sign-in" | "sign-up"

const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email(),
        fullName: formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional()
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
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
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="w-full max-w-[580px] flex flex-col lg:gap-8 gap-6"
            >
                <h1 className="h1 text-n-5 max-md:text-center">
                    {type === "sign-in" ? "Login" : "Create Account"}
                </h1>

                {type === "sign-up" && (
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <div className="p-4 bg-white border border-n-7 rounded-xl shadow-1 space-y-[6px]">
                                    <FormLabel className="!body-2 text-n-5">
                                        Full name
                                    </FormLabel>

                                    <FormControl>
                                        <Input 
                                            placeholder="Enter your full name"
                                            {...field}
                                            className="p-0 border-none shadow-none subtitle-2 text-n-6 placeholder:text-n-6"
                                        />
                                    </FormControl>
                                </div>
                                
                                <FormMessage className="ml-4 caption text-n-9" />
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="p-4 bg-white border border-n-7 rounded-xl shadow-1 space-y-[6px]">
                                <FormLabel className="!body-2 text-n-5">
                                    Email
                                </FormLabel>

                                <FormControl>
                                    <Input 
                                        placeholder="Enter your Email"
                                        {...field}
                                        className="p-0 border-none shadow-none subtitle-2 text-n-6 placeholder:text-n-6"
                                    />
                                </FormControl>
                            </div>
                            
                            <FormMessage className="ml-4 caption text-n-9" />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit"
                    className="h-auto py-6 bg-n-1 hover:bg-n-2 rounded-full transition-all"
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
                    <p className="w-fit mx-auto px-8 py-4 bg-n-14/5 rounded-xl body-2 text-n-14">
                        *{errorMessage}
                    </p>
                )}

                <div className="body-2 flex justify-center items-center gap-1">
                    <p className="text-n-5">
                        {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
                    </p>

                    <Link
                        href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                        className="text-n-1"
                    >
                        {type === "sign-in" ? "Create Account" : "Login"}
                    </Link>
                </div>
            </form>
        </Form>
    )
}

export default AuthForm