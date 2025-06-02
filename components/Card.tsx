import Link from "next/link";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";

const Card = ({ file }: { file: Models.Document }) => {
    return (
        <Link
            href={file.url}
            target="_blank"
            className="bg-white p-5 flex cursor-pointer flex-col gap-6 rounded-[18px] shadow-sm transition-all hover:shadow-3"
        >
            <div className="flex justify-between">
                <Thumbnail 
                    type={file.type}
                    url={file.url}
                    extension={file.extension}
                    className="!size-20"
                    imageClassName="!size-11"
                />

                <div className="flex flex-col justify-between items-end">
                    ActionsDropdown

                    <p className="body-1">
                        {convertFileSize(file.size)}
                    </p>
                </div>
            </div>

            <div className="">
                <p className="subtitle-2 line-clamp-1">
                    {file.name}
                </p>

                <FormattedDateTime />
            </div>
        </Link>
    );
};

export default Card;