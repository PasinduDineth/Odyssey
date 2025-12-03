# NLP Service - Pure Node.js Implementation

## Overview
Semantic test scenario matching using **Transformers.js** and cosine similarity - **100% Node.js, no Python runtime required!**

Python is only used for one-time embedding generation when test scenarios change.

## Architecture

### Current Implementation (Pure Node.js)

```
User Query → Node.js (Transformers.js) → Encode Query → Cosine Similarity → Top 5 Results
                ↓
        Pre-computed Embeddings (JSON file)
```

**Components:**

1. **generate_embeddings.py** - One-time batch processor
   - Fetches test scenarios from MySQL
   - Generates embeddings using sentence-transformers
   - Saves to `server/data/embeddings.json`
   - **Only run when**: Test scenarios are added/modified

2. **nlpService.js** - Pure Node.js NLP engine
   - Loads pre-computed embeddings at startup
   - Uses Transformers.js to encode user queries
   - Performs cosine similarity search
   - Returns top 5 matching scenarios

## Performance

### Current Performance (583 scenarios)
- **First query**: ~1-2 seconds (model warm-up)
- **Subsequent queries**: ~100-200ms
- **Memory usage**: ~150MB (model + embeddings)
- **Acceptable for**: Up to ~5,000 scenarios

### When to Switch to FAISS

**⚠️ If you have >5,000 test scenarios**, switch to FAISS for better performance:

| Scenarios | Current (Node.js) | FAISS (Python) |
|-----------|-------------------|----------------|
| < 1,000   | ~100ms ✅         | ~10ms ⚡       |
| 1,000-5,000 | ~200ms ✅       | ~20ms ⚡       |
| 5,000-10,000 | ~500ms ⚠️      | ~30ms ⚡       |
| > 10,000  | ~1000ms+ ❌       | ~50ms ⚡       |

**To implement FAISS**: See `docs/FAISS_MIGRATION.md` (when needed)

## Setup

### 1. Install Dependencies

```bash
# Node.js dependencies (already done if you ran npm install)
npm install

# Python dependencies (for embedding generation only)
npm run install:pip
```

### 2. Generate Embeddings (First Time / When Data Changes)

```bash
npm run generate:embeddings
```

This creates `server/data/embeddings.json` (~10MB for 583 scenarios)

### 3. Start Server

```bash
npm start
```

**That's it!** No Python server needed at runtime.

## Usage

### API Endpoint

```bash
POST http://localhost:3000/get-suggestions
Content-Type: application/json

{
  "userText": "click on login button"
}
```

### Response

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

### Example (cURL)

```bash
curl -X POST http://localhost:3000/get-suggestions \
  -H "Content-Type: application/json" \
  -d '{"userText": "click on login button"}'
```

## Maintenance

### Updating Test Scenarios

When you add/modify test scenarios in the database:

```bash
# 1. Regenerate embeddings
npm run generate:embeddings

# 2. Restart Node.js server (or call reload)
npm start
```

### Programmatic Reload (Without Restart)

```javascript
const nlpService = require('./utils/nlpService');
await nlpService.reload();
```

## Technical Details

### Model
- **Name**: `Xenova/all-mpnet-base-v2` (via Transformers.js)
- **Dimensions**: 768
- **Language**: English
- **Max tokens**: 384

### File Structure

```
server/
├── data/
│   └── embeddings.json          # Pre-computed (gitignored, ~10MB)
├── utils/
│   ├── nlpService.js            # Node.js NLP engine
│   └── nlp/
│       ├── generate_embeddings.py  # Batch generator (Python)
│       ├── requirements.txt        # Python deps
│       └── README.md              # This file
├── controllers/
│   └── suggestions.controller.js  # API endpoint
└── server.js                      # Entry point
```

### Dependencies

**Node.js:**
- `@xenova/transformers` - Run ML models in Node.js
- `express` - Web framework

**Python (dev-only):**
- `sentence-transformers` - Generate embeddings
- `mysql-connector-python` - Database access

## Optimization Tips

### 1. Query Caching (Optional)

For repeated queries, add caching in `nlpService.js`:

```javascript
const cache = new Map();

async findSimilar(userText) {
  if (cache.has(userText)) {
    return cache.get(userText);
  }
  const results = await this.performSearch(userText);
  cache.set(userText, results);
  return results;
}
```

### 2. Model Pre-loading

The model is loaded once at server startup. First query may be slower (~1-2s) due to warm-up.

### 3. Worker Threads (Advanced)

For high concurrency, offload encoding to worker threads:

```javascript
const { Worker } = require('worker_threads');
// Move encoding to worker to keep main thread responsive
```

## Troubleshooting

### "Embeddings file not found"
```bash
npm run generate:embeddings
```

### "NLP service not initialized"
Wait for server startup to complete (~10 seconds for model loading)

### Slow First Query
Normal - model initialization. Subsequent queries are fast.

### Database Connection Error
Check MySQL is running and credentials in `generate_embeddings.py`

## Migration to FAISS (If Needed)

**When**: You have >5,000 scenarios or need <50ms response time

**Steps:**
1. Keep `generate_embeddings.py` as-is
2. Create Python FAISS microservice (port 5000)
3. Update `suggestions.controller.js` to call Python service
4. Update `package.json` start script to run both servers

See separate documentation for FAISS implementation details.

## License

Part of the Odyssey testing framework.
