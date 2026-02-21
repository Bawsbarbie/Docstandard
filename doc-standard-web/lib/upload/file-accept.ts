export const SUPPORTED_UPLOAD_EXTENSIONS = [
  ".pdf",
  ".json",
  ".xml",
  ".csv",
  ".zip",
  ".txt",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".tif",
  ".tiff",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
] as const

export const UPLOAD_ACCEPT_ATTR = SUPPORTED_UPLOAD_EXTENSIONS.join(",")

export const DROPZONE_ACCEPT = {
  "application/pdf": [".pdf"],
  "application/json": [".json"],
  "text/csv": [".csv"],
  "application/xml": [".xml"],
  "text/xml": [".xml"],
  "application/zip": [".zip"],
  "application/x-zip-compressed": [".zip"],
  "text/plain": [".txt"],
  "image/*": [".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
} as const

export const SUPPORTED_UPLOAD_TYPES_LABEL =
  "PDF, JSON, XML, CSV, ZIP, images, DOC/DOCX, XLS/XLSX, TXT"
