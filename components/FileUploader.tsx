"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "./Thumbnail";
import { toast } from "sonner";
import { MAX_FILE_SIZE } from "@/constants";
import { UploadFileProps } from "@/types";
import { usePathname } from "next/navigation";
import { uploadFile } from "@/lib/actions/file.actions";

const FileUploader = ({
    ownerId,
    accountId,
    className
}: UploadFileProps) => {
    const path = usePathname();
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name),
          );

          return toast(
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
          )
        };

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name),
              );
            }
          },
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path],
  );

    const { getRootProps, getInputProps } = useDropzone({onDrop});

    const handleRemoveFile = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>,
        fileName: string
    ) => {
        e.stopPropagation();

        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    };

    return (
        <div
            {...getRootProps()} 
            className="cursor-pointer"
        >
            <input {...getInputProps()} />

            <Button
                type="button"
                className={cn("bg-brand hover:bg-brand-100 transition-all rounded-full button h-[52px] gap-2 px-10 shadow-1", className)}
            >
                <Image
                    src="/assets/icons/upload.svg"
                    alt="upload"
                    width={24}
                    height={24}
                    className="object-contain"
                />

                <p>Upload</p>
            </Button>

            {files.length > 0 && (
                <ul className="bg-white fixed bottom-10 right-10 z-50 flex size-full h-fit max-w-[480px] flex-col gap-3 rounded-[20px] p-7 shadow-3">
                    <h4 className="h4 text-light-100">
                        Uploading
                    </h4>

                    {files.map((file, index) => {
                        const { type, extension } = getFileType(file.name);

                        return (
                            <li
                                key={`${file.name}-${index}`}
                                className="flex items-center justify-between  gap-3 rounded-xl p-3 shadow-3"
                            >
                                <div className="flex items-center gap-3">
                                    <Thumbnail
                                        type={type}
                                        extension={extension}
                                        url={convertFileToUrl(file)}
                                    />

                                    <div className="subtitle-2 mb-2 line-clamp-1 max-w-[300px]">
                                        {file.name}

                                        <Image
                                            src="/assets/icons/file-loader.gif"
                                            alt="file loader"
                                            width={80}
                                            height={26}
                                            unoptimized
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                <Image
                                    src="/assets/icons/remove.svg"
                                    alt="remove"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                    onClick={(e) => handleRemoveFile(e, file.name)}
                                />
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};

export default FileUploader;