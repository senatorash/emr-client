export const getFileType = (file: File) => {
  if (file.type) return file.type;

  const extension = file.name.split(".").pop()?.toLowerCase();

  const map: Record<string, string> = {
    PDF: "application/pdf",
    JPG: "image/jpeg",
    JPEG: "image/jpeg",
    PNG: "image/png",
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };

  return map[extension || ""] || "application/octet-stream";
};
