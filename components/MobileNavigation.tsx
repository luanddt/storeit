"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
    ownerId: string;
    accountId: string;
    fullName: string;
    avatar: string;
    email: string;
}

const MobileNavigation = ({
    ownerId,
    accountId,
    fullName,
    avatar,
    email
}: Props) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="flex h-[60px] justify-between px-5 sm:hidden">
            <Image
                src="/assets/icons/logo-full-brand.svg"
                alt="storeit"
                width={120}
                height={52}
                className="object-contain"
            />

            <Sheet
                open={open}
                onOpenChange={setOpen}
            >
                <SheetTrigger>
                    <Image
                        src="/assets/icons/menu.svg"
                        alt="menu"
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                </SheetTrigger>

                <SheetContent className="pt-0 px-3 h-screen">
                    <SheetTitle>
                        <div className="my-3 flex items-center gap-2 rounded-full p-1 text-light-100 sm:justify-center sm:bg-brand/10 lg:justify-start lg:p-3">
                            <Image
                                src={avatar}
                                alt={fullName}
                                width={44}
                                height={44}
                                className="aspect-square w-10 rounded-full object-cover"
                            />

                            <div className="sm:hidden lg:block">
                                <p className="subtitle-2">
                                    {fullName}
                                </p>

                                <p className="caption">
                                    {email}
                                </p>
                            </div>
                        </div>

                        <Separator className="mb-4 bg-light-200/20" />
                    </SheetTitle>

                    <nav className="h5 text-light-100">
                        <ul className="flex flex-col gap-4">
                            {navItems.map(({ name, icon, url }) => (
                                <Link
                                    key={name}
                                    href={url}
                                >
                                    <li className={cn("p-4 rounded-xl flex items-center gap-4", pathname === url && "bg-brand text-white shadow-2")}>
                                        <Image
                                            src={icon}
                                            alt={name}
                                            width={24}
                                            height={24}
                                            className={cn("object-contain invert opacity-25", pathname === url && "invert-0 opacity-100")}
                                        />

                                        <p>
                                            {name}
                                        </p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </nav>

                    <Separator className="my-5 bg-light-200/20" />

                    <div className="flex flex-col justify-between gap-5 pb-5">
                        <FileUploader />

                        <Button
                            type="button"
                            className="flex h-[52px] w-full items-center gap-4 rounded-full bg-brand/10 px-6 shadow-none transition-all hover:bg-brand/20"
                            onClick={async () => await signOutUser()}
                        >
                            <Image
                                src="/assets/icons/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                                className="object-contain"
                            />

                            <p className="h5 text-brand">Logout</p>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
};

export default MobileNavigation;