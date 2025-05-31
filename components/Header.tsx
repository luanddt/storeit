import Image from "next/image";
import { Button } from "./ui/button";
import Search from "./Search";
import FileUploader from "./FileUploader";

const Header = () => {
    return (
        <header className="px-5 lg:py-7 py-5 sm:flex hidden justify-between items-center xl:gap-10 gap-5">
            <Search />

            <div className="flex justify-center items-center gap-4">
                <FileUploader />

                <form>
                    <Button
                        type="submit"
                        className="bg-brand/10 hover:bg-brand/20 p-0 size-12 rounded-full flex justify-center items-center"
                    >
                        <Image
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            width={24}
                            height={24}
                            className="object-contain"
                        />
                    </Button>
                </form>
            </div>
        </header>
    );
};

export default Header;