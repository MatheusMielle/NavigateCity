from flask import Flask, jsonify
import pymysql
import json
import os
from flask_cors import CORS

VALID_LOCATIONS = {'city_name', 'country', 'continent'}
VALID_CATEGORIES = {'museum', 'park', 'famous_sight', 'restaurant', 'food'}

try:
    host=os.getenv('MYSQL_HOST', 'localhost')
    user=os.getenv('MYSQL_USERNAME', 'root')
    password=os.getenv('MYSQL_PASSWORD', '')
    database=os.getenv('MYSQL_DATABASE', 'NavigateCity')
except:
    print("Environment variables not set.")
    pass

# read from variables.txt:
with open('variables.txt', 'r') as f:
    lines = f.readlines()
    host = lines[0].strip().split('=')[1]
    database = lines[1].strip().split('=')[1]
    user = lines[2].strip().split('=')[1]
    password = lines[3].strip().split('=')[1]

#Start a connection
def get_db_connection():
    try:
        connection = pymysql.connect(host=host, user=user, password=password, database=database)
        print("Database connection successful")
        return connection
    except Exception as e:
        print("Error connecting to database:", e)
        return None

#Start Flask
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/get-places', methods=['GET'])
def get_places():
    try:
        db = get_db_connection()
        if db is None:
            return jsonify({"error": "Database connection failed"}), 500

        with db.cursor() as cursor:
            cursor.execute("SELECT DISTINCT city_name FROM city;")
            result = cursor.fetchall()
            cities = [row[0] for row in result]
            cursor.execute("SELECT DISTINCT country FROM city;")
            result = cursor.fetchall()
            countries = [row[0] for row in result]
            cursor.execute("SELECT DISTINCT continent FROM city;")
            result = cursor.fetchall()
            continents = [row[0] for row in result]
            return jsonify({"cities": cities, "countries": countries, "continents": continents})
    except Exception as e:
        print("Error fetching places:", e)
        return jsonify({"error": "Failed to fetch places"}), 500


@app.route('/api/get-result/<location>/<name>/<category>', methods=['GET'])
def get_result(location, name, category):
    try:
        # Validate user input strictly against allowed values
        if location not in VALID_LOCATIONS or category not in VALID_CATEGORIES:
            return jsonify({"error": "Invalid location or category"}), 400
        
        db = get_db_connection()
        if db is None:
            return jsonify({"error": "Database connection failed"}), 500

        with db.cursor() as cursor:
            if category == 'food':
                # food is assumed to be linked to restaurant
                query = f"""
                    SELECT * FROM restaurant r
                    JOIN food f ON r.rest_id = f.restaurant_id
                    JOIN city c ON c.city_id = r.city_id
                    WHERE c.{location} = %s;
                """
            else:
                query = f"""
                    SELECT * FROM {category}
                    JOIN city c ON c.city_id = {category}.city_id
                    WHERE c.{location} = %s;
                """

            # Use parameterized queries to avoid injection for values
            cursor.execute(query, (name,))
            result = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            return jsonify([dict(zip(columns, row)) for row in result])

    except Exception as e:
        print("Error fetching result:", e)
        return jsonify({"error": "Failed to fetch result"}), 500

@app.route('/api/get-random/<category>', methods=['GET'])
def get_random(category):
    try:
        if category not in VALID_CATEGORIES:
            return jsonify({"error": "Invalid category"}), 400

        with db.cursor() as cursor:
            if category == 'food':
                # food is assumed to be linked to restaurant
                query = f"SELECT * FROM restaurant r JOIN food f ON r.rest_id = f.restaurant_id JOIN city c on r.city_id = c.city_id ORDER BY RAND() LIMIT 6;"
            else:
                query = f"SELECT * FROM {category} JOIN city c on {category}.city_id = c.city_id ORDER BY RAND() LIMIT 6;"
            cursor.execute(query)
            result = cursor.fetchall()
            if not result:
                return jsonify({"error": "No results found"}), 404

            columns = [col[0] for col in cursor.description]
            return jsonify([dict(zip(columns, row)) for row in result])

    except Exception as e:
        print("Error fetching random item:", e)
        return jsonify({"error": "Failed to fetch random item"}), 500

# start app on 0.0.0.0:5000
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)