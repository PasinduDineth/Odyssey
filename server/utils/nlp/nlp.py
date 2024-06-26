import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
# Need to improve the processing time

app = Flask(__name__)
CORS(app)
# Load the English NLP model from spaCy
model = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')

# Connect to MySQL database
def get_database_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="odyssydb",
        port=3306
    )

# Fetch sentences from the database
def fetch_sentences_from_database():
    db_connection = get_database_connection()
    cursor = db_connection.cursor()
    cursor.execute("SELECT natural_text, id, display_name, action FROM scenario_mappings")
    sentences = [(row[0], row[1], row[2], row[3]) for row in cursor.fetchall()]  # Fetching all columns
    cursor.close()
    db_connection.close()
    return sentences

def process_nlp(sent):
    other_sentences = fetch_sentences_from_database()
    source_embedding = model.encode([sent])[0]
    other_embeddings = model.encode([row[0] for row in other_sentences])  # Extracting only natural_text
    similarities = cosine_similarity([source_embedding], other_embeddings)[0]
    
    # Convert similarities from float32 to float
    similarities = similarities.astype(float)
    
    sentence_similarity_pairs = list(zip(other_sentences, similarities))  # Pairing with all columns
    sorted_sentence_similarity_pairs = sorted(sentence_similarity_pairs, key=lambda x: x[1], reverse=True)
    
    # Create objects with key-value pairs
    results = []
    for sentence, score in sorted_sentence_similarity_pairs[:5]:
        result_object = {
            'natural_text': sentence[0],
            'id': sentence[1],
            'display_name': sentence[2],
            'action': sentence[3],
            'score': float(score)
        }
        results.append(result_object)
    
    return results

@app.route('/process-nlp', methods=['POST'])
def process_nlp_endpoint():
    try:
        data = request.get_json()
        if 'input_text' not in data:
            return jsonify({"error": "Input text not provided"}), 400
        input_text = data['input_text']
        result = process_nlp(input_text)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Nlp server is running")
    app.run(debug=True)


# curl -X POST http://localhost:5000/process-nlp -H "Content-Type: application/json" -d '{
#    "input_text": "Mouseover on #{element}"
#    }'