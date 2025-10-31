// src/types/index.ts
export interface Document {
  id?: string;
  text: string;
  pageContent:any, metadata: any;
}

export interface VectorStore {
  addDocuments(docs: Document[]): Promise<void>;
  similaritySearch(query: string, k?: number): Promise<Document[]>;
}

export interface LLM {
  generate(prompt: string): Promise<string>;
}
