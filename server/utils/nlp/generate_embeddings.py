"""
Generate embeddings for test scenarios and save to JSON file.
Run this script whenever test scenarios are added/modified in the database.
"""
import mysql.connector
from sentence_transformers import SentenceTransformer
import numpy as np
import json
import os

# Configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'odyssydb',
    'port': 3306
}
MODEL_NAME = 'sentence-transformers/all-mpnet-base-v2'
OUTPUT_FILE = '../../data/embeddings.json'

def get_database_connection():
    """Establish MySQL database connection."""
    return mysql.connector.connect(**DB_CONFIG)

def fetch_scenarios_from_database():
    """Fetch test scenario mappings from database."""
    db_connection = None
    try:
        db_connection = get_database_connection()
        cursor = db_connection.cursor()
        cursor.execute("SELECT natural_text, id, display_name, action FROM scenario_mappings")
        scenarios = [
            {
                'natural_text': row[0],
                'id': row[1],
                'display_name': row[2],
                'action': row[3]
            }
            for row in cursor.fetchall()
        ]
        cursor.close()
        return scenarios
    except mysql.connector.Error as e:
        print(f"Database error: {e}")
        raise
    finally:
        if db_connection:
            db_connection.close()

def generate_embeddings(scenarios, model):
    """Generate embeddings for all scenarios."""
    print(f"Generating embeddings for {len(scenarios)} scenarios...")
    natural_texts = [scenario['natural_text'] for scenario in scenarios]
    embeddings = model.encode(natural_texts, show_progress_bar=True)
    
    # Convert to list for JSON serialization
    embeddings_list = embeddings.tolist()
    
    return embeddings_list

def save_embeddings(scenarios, embeddings, output_file):
    """Save scenarios and embeddings to JSON file."""
    data = {
        'model': MODEL_NAME,
        'dimension': len(embeddings[0]),
        'count': len(scenarios),
        'scenarios': scenarios,
        'embeddings': embeddings
    }
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)
    
    print(f"Saved {len(scenarios)} scenarios and embeddings to {output_file}")
    print(f"File size: {os.path.getsize(output_file) / 1024:.2f} KB")

def main():
    print("=" * 60)
    print("Embedding Generator for Test Scenarios")
    print("=" * 60)
    
    # Load model
    print(f"\nLoading model: {MODEL_NAME}")
    model = SentenceTransformer(MODEL_NAME)
    
    # Fetch scenarios
    print("\nFetching scenarios from database...")
    scenarios = fetch_scenarios_from_database()
    print(f"Found {len(scenarios)} scenarios")
    
    # Generate embeddings
    embeddings = generate_embeddings(scenarios, model)
    
    # Save to file
    print(f"\nSaving to {OUTPUT_FILE}...")
    save_embeddings(scenarios, embeddings, OUTPUT_FILE)
    
    print("\n✅ Embeddings generation complete!")
    print("=" * 60)

if __name__ == '__main__':
    main()
