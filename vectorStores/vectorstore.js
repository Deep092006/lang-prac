import { Chroma } from "@langchain/community/vectorstores/chroma";
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { configDotenv } from "dotenv";
configDotenv(); // 🌿 Load env variables

export class ChromaManager {
  constructor({
    model = "text-embedding-004",
    collectionName = "a-test-collection",
    persistDirectory = "../chroma_db",
  } = {}) {
    this.model = model; // 🧠 Embedding model
    this.collectionName = collectionName; // 📂 Collection name
    this.persistDirectory = persistDirectory; // 💾 Storage directory

    this.chatModel = new ChatGoogleGenerativeAI({ model: "gemini-2.5-flash" }); // 💬 Init chat model

    const embeddings = new GoogleGenerativeAIEmbeddings({ model: this.model }); // ✨ Init embeddings

    this.vectorStore = new Chroma(embeddings, {
      collectionName: this.collectionName,
      persistDirectory: this.persistDirectory,
    }); // 🔹 Init vector store
  }

  // 📦 Add documents to vector store
  async addinvector(data) {
    try {
      await this.vectorStore.addDocuments(
        data.map((d, i) => ({ pageContent: d.pageContent, metadata: { source: `chunk-${i}` } }))
      );
      console.log("✅ Successfully added documents to vector store"); // ✅ Success
    } catch (err) {
      console.error("❌ Error adding to vector store:", err); // ❌ Error
    }
  }

  // 🔍 Search for similar documents
  async searchinvector(query, k = 5) {
    try {
      const results = await this.vectorStore.similaritySearch(query, k); // 🔎 Perform similarity search
      return results; // 📤 Return results
    } catch (err) {
      console.error("❌ Error searching vector store:", err); // ❌ Error
      return []; // ⚠️ Return empty array on failure
    }
  }
}
