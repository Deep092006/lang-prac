# Lang-Prac 📚

A Retrieval-Augmented Generation (RAG) application built with LangChain, Google Gemini, and ChromaDB that allows users to upload PDF documents and ask questions about their content using AI.

## 🚀 Features

- **PDF Upload & Processing**: Upload PDF files and automatically chunk them for vector storage
- **AI-Powered Q&A**: Ask questions about uploaded documents and get contextual answers
- **Vector Similarity Search**: Uses ChromaDB for efficient document retrieval
- **Google Gemini Integration**: Powered by Google's Gemini 2.5 Flash model
- **RESTful API**: Simple HTTP endpoints for document upload and querying

## 🛠️ Tech Stack

- **Backend**: Node.js with Express.js
- **AI/ML**: 
  - LangChain for document processing and RAG pipeline
  - Google Gemini 2.5 Flash for chat completions
  - Google text-embedding-004 for embeddings
- **Vector Database**: ChromaDB for similarity search
- **File Processing**: 
  - PDF parsing with pdf-parse
  - Document chunking with RecursiveCharacterTextSplitter
- **Package Manager**: pnpm
- **Development**: TypeScript support, ESLint, Nodemon

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Google AI API key (for Gemini access)

## 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd lang-prac
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   ```

4. **Create uploads directory**:
   ```bash
   mkdir uploads
   ```

## 🚀 Usage

### Starting the Server

```bash
node app.js
```

The server will start on port 5000: `http://localhost:5000`

### API Endpoints

#### 1. Upload PDF Document
```http
POST /upload
Content-Type: multipart/form-data

Body: file (PDF file)
```

**Example using curl**:
```bash
curl -X POST -F "file=@document.pdf" http://localhost:5000/upload
```

**Response**:
```json
{
  "message": "File uploaded and processed successfully"
}
```

#### 2. Ask Questions About Uploaded Document
```http
GET /ask/:question
```

**Example**:
```bash
curl http://localhost:5000/ask/What%20is%20the%20main%20topic%20of%20this%20document?
```

**Response**: Plain text answer based on the document content.

## 📁 Project Structure

```
lang-prac/
├── app.js                    # Main Express application
├── package.json              # Project dependencies and scripts
├── sample.pdf               # Sample PDF for testing
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   ├── chatmodel.js         # Google Gemini chat model configuration
│   ├── getcotextandsearch.js # RAG pipeline implementation
│   ├── loadAndChunkPDF.js   # PDF loading and chunking utilities
│   └── storage.js           # Multer file upload configuration
└── vectorStores/
    └── vectorstore.js       # ChromaDB vector store manager
```

## 🔄 How It Works

1. **Document Upload**: 
   - User uploads a PDF via `/upload` endpoint
   - PDF is parsed and split into chunks using RecursiveCharacterTextSplitter
   - Chunks are embedded using Google's text-embedding-004 model
   - Embeddings are stored in ChromaDB

2. **Question Answering**:
   - User asks a question via `/ask/:question` endpoint
   - Question is embedded and used to search for similar document chunks
   - Top 5 most relevant chunks are retrieved from ChromaDB
   - Context and question are sent to Gemini 2.5 Flash for answer generation

## 🎯 Key Components

### ChromaManager
Manages vector store operations including document addition and similarity search.

### RAG Pipeline
Implements the complete Retrieval-Augmented Generation workflow:
- Context retrieval from vector store
- Prompt construction with retrieved context
- Answer generation using Gemini

### PDF Processing
Handles PDF loading, parsing, and intelligent text chunking for optimal retrieval.

## 🧪 Development

### Running in Development Mode
```bash
pnpm run dev  # If you add nodemon script
```

### TypeScript Support
The project includes TypeScript definitions in the `types/` directory for better development experience.

### Linting
```bash
pnpm run lint  # If you add ESLint script
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_AI_API_KEY` | Your Google AI API key for Gemini access | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔮 Future Enhancements

- [ ] Support for multiple document formats (Word, TXT, etc.)
- [ ] Document management (list, delete uploaded documents)
- [ ] User authentication and document isolation
- [ ] Streaming responses for real-time answers
- [ ] Web UI for easier interaction
- [ ] Document metadata extraction and filtering
- [ ] Support for multiple vector stores (Pinecone, Weaviate, etc.)

## 🐛 Troubleshooting

### Common Issues

1. **"GOOGLE_AI_API_KEY not found"**
   - Ensure your `.env` file is in the root directory
   - Verify the API key is correctly set

2. **"ChromaDB connection error"**
   - Check if the `chroma_db` directory exists and has proper permissions
   - Ensure ChromaDB dependencies are properly installed

3. **"PDF parsing failed"**
   - Verify the uploaded file is a valid PDF
   - Check file size limits (if any)

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

Made with ❤️ using LangChain and Google Gemini
