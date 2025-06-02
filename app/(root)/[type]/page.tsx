import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { SearchParamProps } from "@/types";
import { Models } from "node-appwrite";

const Type = async ({ params }: SearchParamProps) => {
    const type = ((await params) ?.type as string) || "";

    const files = await getFiles();

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
            <section className="w-full">
                <h1 className="h1">
                    {type}
                </h1>

                <div className="flex mt-2 flex-col justify-between sm:flex-row sm:items-center">
                    <p className="body-1">
                        Total:{" "}

                        <span className="h5">
                            0 MB
                        </span>
                    </p>

                    <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
                        <p className="body-1 text-light-200 max-md:hidden">
                            Sort by:
                        </p>

                        <Sort />
                    </div>
                </div>
            </section>

            {files.total > 0 ? (
                <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {files.documents.map((file: Models.Document) => (
                        <Card
                            key={file.$id}
                            file={file}
                        />
                    ))}
                </section>
            ): (
                <p className="body-1 mt-10 text-center text-light-200">
                    No files uploaded
                </p>
            )}
        </div>
    );
};

export default Type;