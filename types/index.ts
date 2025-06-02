export interface UploadFileProps {
    file: File;
    ownerId: string;
    accountId: string;
    className?: string;
    path: string;
};

export interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}