import mysql.connector
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

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
    cursor.execute("SELECT natural_text FROM scenario_mappings")
    sentences = [row[0] for row in cursor.fetchall()]
    cursor.close()
    db_connection.close()
    return sentences

# Process NLP
def process_nlp(sent):
    other_sentences = fetch_sentences_from_database()
    source_embedding = model.encode([sent])[0]
    other_embeddings = model.encode(other_sentences)
    similarities = cosine_similarity([source_embedding], other_embeddings)[0]
    sentence_similarity_pairs = list(zip(other_sentences, similarities))
    sorted_sentence_similarity_pairs = sorted(sentence_similarity_pairs, key=lambda x: x[1], reverse=True)
    return [sentence for sentence, score in sorted_sentence_similarity_pairs[:5]]

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