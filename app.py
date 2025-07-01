# NavigateCity
# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023

# This is the main structure of the website
# This program will stablish a connection with the database, execute queries and interact with the html using Flask

from flask import Flask, render_template, request
#from chatbot import get_sql
#from bard import get_sql
import pymysql
import json
from create_database.create import create_database
import os

# Get Queries from queries.txt
create_database()  # Create the database if it does not exist
queries = {}
count = 0
with open('./queries/queries.txt', 'r') as q:
    for row in q:
        queries[count] = {"index": count, "name": row.split('|')[0], "sql": row.split('|')[1]}
        count += 1


host=os.getenv('MYSQL_HOST', 'localhost')
user=os.getenv('MYSQL_USERNAME', 'root')
password=os.getenv('MYSQL_PASSWORD', '')
database=os.getenv('MYSQL_DATABASE', 'NavigateCity')

#Start a connection
db = pymysql.connect(host=host, user=user, password=password, database=database)

#Start Flask
app = Flask(__name__, static_folder='./static', )


@app.route('/')
def home():
    return render_template('Landing.html')


#Suggestive search box  
@app.route('/suggestion')
def index():
    #Send the queries dictionary to the filter HTML 
    return render_template('filter.html', queries=queries)


@app.route('/result/<int:index>')
def result(index):
    
    #Execute SQL and get results
    c = db.cursor()

    try:
        c.execute(queries[index]['sql'])  # execute the query
    except pymysql.Error:
        return render_template('no_results.html')
    
    results = c.fetchall()  # fetch the results

    #Verify if results were valid, Not empty
    if len(results) == 0:
        return render_template('no_results.html')
    
# Convert the tuple to a list of dictionaries
    dict_results = [] 

    # Iterate over each row in the results
    for row in results:

        # Extract the column names from the cursor description
        column_names = []
        for column in c.description:
            column_names.append(column[0])

        # Create a sequence of tuples where each tuple represents a key-value pair and convert in into a dictionary
        # Ref.: https://www.w3schools.com/python/ref_func_zip.asp
        row_values = dict(zip(column_names, row))

        # Append the resulting dictionary to the list of dictionaries
        dict_results.append(row_values)
    
    # Render the results template and pass it the list of dictionaries
    # Ref.:https://stackoverflow.com/questions/33396064/flask-template-not-found
    return render_template('results.html', results=dict_results) 


@app.route('/chat')
def chat():
    return render_template('website.html')

# @app.route('/search')
# def search():

#     # Get the search query from the URL parameters
#     query = request.args.get('search')

#     #Request GPT for the SQL    
#     sql = get_sql(query)
#     #sql = "SELECT * FROM navigatecity.city;" #TEST

#     #Verify if the SQL is valid, it is only going to select some data
#     words = sql.split()
#     if words[0] == '```sql':
#         del words[0]
#         sql = sql[7:]
#     if words[len(words)-1] == "```":
#         sql = sql[:-3]
#     if words[0] != "SELECT":
#        #in some cases a dot is being inserted in the beginning of the sql. this will eliminate it
#        if words[1] != "SELECT":
#         return render_template('no_results.html') 
#        else:
#         sql = sql[1:]
    
#     #Execute SQL and get results
#     c = db.cursor()
#     try:
#         c.execute(sql)  # execute the query
#     except pymysql.Error:
#         return render_template('no_results.html')
#     results = c.fetchall()  # fetch the results

#     #Verify if results were valid, Not empty
#     if len(results) == 0:
#         return render_template('no_results.html')
    
# # Convert the tuple to a list of dictionaries
#     dict_results = [] 

#     # Iterate over each row in the results
#     for row in results:

#         # Extract the column names from the cursor description
#         column_names = []
#         for column in c.description:
#             column_names.append(column[0])

#         # Create a sequence of tuples where each tuple represents a key-value pair and convert in into a dictionary
#         # Ref.: https://www.w3schools.com/python/ref_func_zip.asp
#         row_values = dict(zip(column_names, row))

#         # Append the resulting dictionary to the list of dictionaries
#         dict_results.append(row_values)
    
#     # Render the results template and pass it the list of dictionaries
#     # Ref.:https://stackoverflow.com/questions/33396064/flask-template-not-found
#     return render_template('results.html', results=dict_results)




