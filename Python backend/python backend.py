from langchain import OpenAI, SQLDatabase, SQLDatabaseChain
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Setup database

@app.route('/first', methods=['POST'])
def first():
    db = SQLDatabase.from_uri("mysql+pymysql://u152804513_ajaffee:Spiderman3@217.21.87.52:3306/u152804513_price")
    # setup llm
    llm = OpenAI(temperature=0, openai_api_key='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')
    # Create db chain
    QUERY = """
    If you are given a style name then follow this:
    Give all details in good formatting related to {Style} style if not style found then search it in itemid column,If there are multiple responses, include the above details, each record on a separate line.
    Give the answer like this only:
    Item Category:
    Item Id:
    Style name:
    Version:
    Sizes:
    Shape:
    Metal:
    Quality:
    Price:

    If you are given a question from faq table then answer it accordingly:
    If you have no results then say: No results found. Do you want to reach out to customer support with your inquiry?
    """
    # Setup the database chain
    db_chain = SQLDatabaseChain(llm=llm, database=db, verbose=True)
    data = request.get_json()
    prompt = data['prompt']
    question = QUERY.format(Style=prompt)
    response = db_chain.run(question)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)