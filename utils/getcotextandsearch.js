import { ChromaManager } from "../vectorStores/vectorstore.js";
import { chatModel } from "./chatmodel.js";


export const generateAnswerFromContext = async (
  { query,
    collectionName = "text-embedding-004" }
) => {
  try {
    // 🧠 Initialize Chroma vector store manager
    const chroma = new ChromaManager({ collectionName });

    // 🔍 Retrieve top 5 most similar documents
    const relevantDocs = await chroma.searchinvector(query, 5);
    const context = relevantDocs.map((doc) => doc.pageContent).join("\n");

    // 💬 Ask Gemini for a context-aware answer
    const response = await chatModel.invoke(`
Answer concisely based only on the context below.

Context:
${context}

If the answer is not found in the context, reply with: "I don't know."

Question: ${query}
    `);

    return response.content;
  } catch (error) {
    console.error("❌ RAG pipeline error:", error);
    throw new Error("INTERNAL SERVER ERROR");
  }
};
