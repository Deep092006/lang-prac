import multer from "multer";
import path from "path";

// 🗄️ Configure disk storage for uploads
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 📂 Folder to store files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // 📄 Get file extension
    const name = `${Date.now()}-${file.originalname}`; // ⏱️ Prepend timestamp
    cb(null, name); // ✅ Set final filename
  },
});

// 📤 Export multer upload middleware
export const upload = multer({ storage });
