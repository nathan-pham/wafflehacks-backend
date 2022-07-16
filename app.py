from dotenv import load_dotenv
from os import environ
load_dotenv()

from api import app
from api.queries import query
from api.mutations import mutation

from flask import request, jsonify
import ariadne as gql

type_defs = gql.load_schema_from_path("schema.gql")
schema = gql.make_executable_schema(type_defs, query, mutation, gql.snake_case_fallback_resolvers)

@app.route("/graphql", methods=["GET"])
def graphql_playground():
    return gql.constants.PLAYGROUND_HTML, 200

@app.route("/graphql", methods=["POST"])
def graphql_server():
    json = request.get_json()
    success, result = gql.graphql_sync(schema, json, context_value=request, debug=app.debug)
    status_code = 200 if success else 400
    return jsonify(result), status_code

app.run(debug=environ.get("MODE") == "development")