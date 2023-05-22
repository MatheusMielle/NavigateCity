# ChatBot to generate queries for NavegateCity using Openai's davinci-002
# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023

# This program is a side project of our main program.
# It uses openai's API for davinci-002 to generate the queries 
# meaning that the website user only need to type what they desire in english and a query will be generated


import openai
import json

# Load the JSON data from the file
secrets = open('data/secrets.json', 'r')
data = json.load(secrets)

# Extract the OpenAI API key
openai.api_key = data['openai']['api_key']

def get_sql(query):

    prompt = "Based on the following database squema generate a sql that displays "
    prompt += query
    prompt += ": City(City_ID(INT), City_name(STRING), Country(STRING), Continent(STRING))\n"
    prompt += "Restaurant(Rest_ID(INT), Rest_name(STRING), City_ID(INT), Avg_Price_USD(FLOAT), Description(STRING))\n"
    prompt += "Food(Food_ID(INT), Dish_name(STRING), Restaurant_ID(INT), Price_USD(FLOAT), Description(STRING))\n"
    prompt += "Museum(Museum_ID(INT), Museum_name(STRING), City_ID(INT), Type(STRING), Description(STRING))\n" 
    prompt += "Famous_Sight(Sight_ID(INT), Sight_name(STRING), City_ID(INT), Description(STRING))\n"
    prompt += "Park(Park_ID(INT), Park_name(STRING), City_ID(INT), Type(STRING), Description(STRING))"
    prompt += "Note: the SQL should have the column names EXACTLY as shown above. The SQL should run without errors in that database squema"

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=256,
        n=1,
        stop=None,
        temperature=0.5,
    )

    return (response.choices[0].text)

