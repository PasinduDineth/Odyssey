from flask import Flask, request, jsonify
import spacy

app = Flask(__name__)

# Load the English NLP model from spaCy
nlp = spacy.load("en_core_web_sm")

def process_natural_language(input_text):
    # Process the natural language input
    doc = nlp(input_text)

    # Extract information from the processed document
    actions = [token.text for token in doc if token.pos_ == "VERB"]
    objects = [token.text for token in doc if token.dep_ in ["dobj", "attr"]]

    # Return the extracted information as a dictionary
    return {"input": input_text, "actions": actions, "objects": objects}


# curl -X POST http://localhost:5000/process-nlp -H "Content-Type: application/json" -d '{
#    "input_text": "Mouseover on #{element}"
#    }'

@app.route('/process-nlp', methods=['POST'])
def process_nlp_endpoint():
    try:
        # Get the JSON data from the POST request
        data = request.get_json()

        # Check if the 'input_text' key exists in the JSON data
        if 'input_text' not in data:
            return jsonify({"error": "Input text not provided"}), 400

        # Get the input_text from the JSON data
        input_text = data['input_text']

        # Process the natural language input using spaCy
        result = process_natural_language(input_text)

        # Return the result as JSON
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Nlp server is running")
    app.run(debug=True)