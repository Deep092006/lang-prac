import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// ✂️ Load PDF and split into chunks
export async function loadAndChunkPDF(filePath, chunkSize = 1000, chunkOverlap = 200) {
  const loader = new PDFLoader(filePath); // 📄 Load PDF
  const docs = await loader.load(); // ✅ Read PDF content

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize, chunkOverlap }); // ✨ Init splitter
  const chunkedDocs = await splitter.splitDocuments(docs); // 🔗 Split into chunks

  return chunkedDocs; // 📤 Return chunked documents
}