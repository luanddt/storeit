"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    fullName: string;
    avatar: string;
    email: string;
};

const Sidebar = ({ fullName, avatar, email }: Props) => {
    const pathname = usePathname();

    return (
        <aside className="px-5 py-7 sm:flex hidden flex-col">
            <Link href="/">
                <Image
                    src="/assets/icons/logo-full-brand.svg"
                    alt="storeit"
                    width={160}
                    height={50}
                    className="object-contain max-lg:hidden"
                />

                <Image
                    src="/assets/icons/logo-brand.svg"
                    alt="storeit"
                    width={52}
                    height={52}
                    className="object-contain lg:hidden"
                />
            </Link>

            <nav className="mt-9 h5 text-light-100 flex-[1]">
                <ul className="flex flex-col gap-5">
                    {navItems.map(({ name, icon, url }) => (
                        <Link
                            key={name}
                            href={url}
                        >
                            <li className={cn("p-4 lg:rounded-full rounded-xl flex max-lg:justify-center items-center gap-4", pathname === url && "bg-brand text-white shadow-2")}>
                                <Image
                                    src={icon}
                                    alt={name}
                                    width={24}
                                    height={24}
                                    className={cn("object-contain invert opacity-25", pathname === url && "invert-0 opacity-100")}
                                />

                                <p className="max-lg:hidden">
                                    {name}
                                </p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>

            <Image
                src="/assets/images/files-bg.png"
                alt="files"
                width={253}
                height={209}
                className="object-contain max-lg:hidden"
            />

            <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand/10 p-1 text-light-100 lg:justify-start lg:p-3">
                <Image
                    src={avatar}
                    alt={fullName}
                    width={44}
                    height={44}
                    className="object-cover rounded-full"
                />

                <div className="max-lg:hidden">
                    <p className="subtitle-2">
                        {fullName}
                    </p>

                    <p className="caption">
                        {email}
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;