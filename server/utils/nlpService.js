/**
 * NLP Service - Pure Node.js implementation
 * Handles test scenario matching using pre-computed embeddings
 * Uses Transformers.js to encode user queries (no Python needed!)
 */

const { pipeline } = require('@xenova/transformers');
const path = require('path');
const fs = require('fs').promises;

// Configuration
const EMBEDDINGS_FILE = path.join(__dirname, '../data/embeddings.json');
const MODEL_NAME = 'Xenova/all-mpnet-base-v2';
const TOP_K_RESULTS = 5;

class NLPService {
  constructor() {
    this.embeddings = null;
    this.scenarios = null;
    this.extractor = null;
    this.isInitialized = false;
  }

  /**
   * Normalize vector for cosine similarity
   */
  normalize(vector) {
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return vector.map(val => val / norm);
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Initialize the NLP service
   */
  async initialize() {
    try {
      console.log('Initializing NLP Service...');
      
      // Load pre-computed embeddings
      const data = await this.loadEmbeddings();
      this.scenarios = data.scenarios;
      this.embeddings = data.embeddings;
      
      // Initialize Transformers.js model
      console.log(`Loading model: ${MODEL_NAME}`);
      this.extractor = await pipeline('feature-extraction', MODEL_NAME);
      
      this.isInitialized = true;
      console.log(`✅ NLP Service ready with ${this.scenarios.length} scenarios`);
    } catch (error) {
      console.error('Failed to initialize NLP Service:', error);
      throw error;
    }
  }

  /**
   * Load embeddings from JSON file
   */
  async loadEmbeddings() {
    try {
      const fileContent = await fs.readFile(EMBEDDINGS_FILE, 'utf-8');
      const data = JSON.parse(fileContent);
      
      console.log(`Loaded embeddings: ${data.count} scenarios, dimension: ${data.dimension}`);
      return data;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(
          'Embeddings file not found. Please run: python server/utils/nlp/generate_embeddings.py'
        );
      }
      throw error;
    }
  }

  /**
   * Encode text to embedding vector using Transformers.js
   */
  async encodeText(text) {
    if (!this.extractor) {
      throw new Error('Model not loaded');
    }

    // Generate embedding
    const output = await this.extractor(text, { pooling: 'mean', normalize: true });
    
    // Convert to regular array
    return Array.from(output.data);
  }

  /**
   * Find top K most similar test scenarios
   * @param {string} userText - User input text
   * @returns {Array} Top K similar scenarios with scores
   */
  async findSimilar(userText) {
    if (!this.isInitialized) {
      throw new Error('NLP Service not initialized');
    }

    // Encode user query
    const queryEmbedding = await this.encodeText(userText);

    // Calculate similarity scores for all scenarios
    const results = this.scenarios.map((scenario, index) => {
      const score = this.cosineSimilarity(queryEmbedding, this.embeddings[index]);
      return {
        natural_text: scenario.natural_text,
        id: scenario.id,
        display_name: scenario.display_name,
        action: scenario.action,
        score: score
      };
    });

    // Sort by score (descending) and return top K
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, TOP_K_RESULTS);
  }

  /**
   * Reload embeddings from file (call after regenerating embeddings)
   */
  async reload() {
    console.log('Reloading embeddings...');
    this.isInitialized = false;
    await this.initialize();
  }
}

// Singleton instance
const nlpService = new NLPService();

module.exports = nlpService;
