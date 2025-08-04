# ChatBot to generate queries for NavegateCity using bard
# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023

# This program is a side project of our main program.
# It uses Bards API to generate the queries 
# meaning that the website user only need to type what they desire in english and a query will be generated


import google.generativeai as palm
import os
import json

# Load the JSON data from the file
secrets = open('data/secrets.json', 'r')
data = json.load(secrets)

# Extract the Bard API key
key = data['bard']['api_key']
palm.configure(api_key=key)

def get_sql(query):

    prompt = "Based on the following database squema generate a sql that displays "
    prompt += query
    prompt += ": City(City_ID(INT), City_name(STRING), Country(STRING), Continent(STRING))\n"
    prompt += "Restaurant(Rest_ID(INT), Rest_name(STRING), City_ID(INT), Avg_Price_USD(FLOAT), Description(STRING))\n"
    prompt += "Food(Food_ID(INT), Dish_name(STRING), Restaurant_ID(INT), Price_USD(FLOAT), Description(STRING))\n"
    prompt += "Museum(Museum_ID(INT), Museum_name(STRING), City_ID(INT), Type(STRING), Description(STRING))\n" 
    prompt += "Famous_Sight(Sight_ID(INT), Sight_name(STRING), City_ID(INT), Description(STRING))\n"
    prompt += "Park(Park_ID(INT), Park_name(STRING), City_ID(INT), Type(STRING), Description(STRING))"
    prompt += "Note: the SQL should have the column names EXACTLY as shown above. The SQL should run without errors in that database squema. Only give me the querries with no additional text"

    response = palm.generate_text(prompt=prompt)
    print(response.result)
   

    return (response.result)

