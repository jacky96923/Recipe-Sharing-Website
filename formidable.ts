import formidable from "formidable";
import { mkdirSync } from "fs";

let uploadDir = "uploads";
mkdirSync(uploadDir, { recursive: true });
export const form = new formidable.Formidable({
  uploadDir,
  filter(part) {
    return part.mimetype?.startsWith("image") || false; //如果俾幅圖勍return true
  },
  filename(_name, _ext, part, form) {
    //file的格式
    return "${},";
  },
});
