# Odyssey - NLP-Powered E2E Testing Framework

## Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
npm run install:pip
```

### 2. Setup Database & Generate Embeddings
```bash
# Ensure MySQL is running with odyssydb database
npm run generate:embeddings
```

### 3. Start Server
```bash
npm start
```

Server runs on `http://localhost:3000`

## NLP Service Architecture

### Pure Node.js Implementation ✅
- **Runtime**: 100% Node.js (no Python server needed!)
- **Python usage**: Only for one-time embedding generation
- **Performance**: ~100-200ms per query (583 scenarios)
- **Model**: Transformers.js (Xenova/all-mpnet-base-v2)

### How It Works
```
User Input → Node.js (Transformers.js) → Encode Query 
    ↓
Pre-computed Embeddings (JSON) → Cosine Similarity → Top 5 Matches
```

## Project Structure

```
odyssey/
├── server/                     # Node.js backend
│   ├── server.js              # Entry point
│   ├── data/
│   │   └── embeddings.json    # Pre-computed (gitignored, ~10MB)
│   ├── controllers/
│   │   └── suggestions.controller.js  # NLP API endpoint
│   ├── utils/
│   │   ├── nlpService.js      # Pure Node.js NLP engine
│   │   └── nlp/
│   │       ├── generate_embeddings.py  # Embedding generator
│   │       ├── requirements.txt
│   │       └── README.md      # Detailed NLP docs
│   ├── models/
│   └── routes/
├── odyssey-ui/                # Next.js frontend
└── package.json
```

## API Usage

### Get Test Suggestions
```bash
POST http://localhost:3000/get-suggestions
Content-Type: application/json

{
  "userText": "click on login button"
}
```

**Response:**
```json
{
  "data": [
    {
      "natural_text": "Click on element",
      "id": 123,
      "display_name": "click", 
      "action": "click",
      "score": 0.85
    }
  ]
}
```

## Updating Test Scenarios

When you add/modify test scenarios in the database:

```bash
npm run generate:embeddings
# Then restart server
```

## Performance & Scaling

### Current Performance (583 scenarios)
- First query: ~1-2s (model warm-up)
- Subsequent: ~100-200ms
- Memory: ~150MB

### When to Migrate to FAISS

**Switch to FAISS if:**
- You have **>5,000 scenarios**
- You need **<50ms response time**
- High query volume (>10,000/hour)

See `server/utils/nlp/README.md` for FAISS migration guidance.

## Development

### Available Scripts

```bash
npm start                    # Start Node.js server
npm run generate:embeddings  # Regenerate embeddings from DB
npm run install:pip          # Install Python dependencies
npm test                     # Run tests
```

### Tech Stack

**Backend:**
- Node.js + Express
- Transformers.js (ML models in Node.js)
- MySQL

**Frontend:**
- Next.js
- React
- Tailwind CSS

**Testing:**
- CodeceptJS
- Playwright

## Documentation

- **NLP Service**: `server/utils/nlp/README.md` - Detailed NLP documentation
- **API Docs**: Coming soon
- **Database Schema**: `server/models/odyssyDB.sql`

## Contributing

This is a research/educational project exploring no-code E2E testing with NLP.

## License

ISC - Pasindu Dineth Peiris
