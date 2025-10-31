import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";

import { ChromaManager } from "./vectorStores/vectorstore.js";
import { generateAnswerFromContext } from "./utils/getcotextandsearch.js";
import { upload } from "./utils/storage.js";
import { loadAndChunkPDF } from "./utils/loadAndChunkPDF.js";

configDotenv(); // 🌿 Load env variables

const app = express();
app.use(cors()); // 🌐 Enable CORS

// 💬 Get answer from vector DB
app.get('/ask/:id', async (req, res) => {
  try {
    const answer = await generateAnswerFromContext({ query: req.params.id, collectionName: "originalname" });
    res.send(answer); // ✅ Send response
  } catch (err) {
    console.error("❌ /ask error:", err); // ❌ Log error
    res.status(500).json({ message: "internal server error" }); // ⚠️ Return error
  }
});

// 📄 Upload PDF and store chunks in vector DB
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("📂 Uploaded file path:", req.file.path); // 📁 Log file path

    const chunkedDocs = await loadAndChunkPDF(req.file.path); // ✂️ Split PDF into chunks
    const vector = new ChromaManager({ collectionName: "originalname" }); // 🧠 Init Chroma manager

    await vector.addinvector(
      chunkedDocs.map((d, i) => ({ pageContent: d.pageContent, metadata: { source: `chunk-${i}` } })),
      { ids: chunkedDocs.map((_, i) => `chunk-${i}`) }
    ); // 🔗 Add chunks to vector DB

    res.json({ message: "File uploaded and processed successfully" }); // ✅ Success response
  } catch (err) {
    console.error("❌ /upload error:", err); // ❌ Log error
    res.status(500).json({ message: "internal server error" }); // ⚠️ Return error
  }
});

app.listen(5000, () => console.log('🚀 Server running on port 5000')); // 🚀 Start server
