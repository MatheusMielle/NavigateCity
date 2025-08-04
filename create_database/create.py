# Create database for NavigateCity
# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023

# This Program is designed to generate the database for our website
# The program import the files city.py, food.py, restaurant.py, museum.py, sightseen.py and park.py
# Each of the files contains a create and a insert function
# The create function generates the sql that creates instance of each of the categories
# The insert function gets data from the .csv files stored in the data folder and generate the sql to insert each data into the database
# This programs gets the sql in string format and executes it

import pymysql
from city import create_city,insert_city
from food import create_food,insert_food
from restaurant import create_restaurant,insert_restaurant
from museum import create_museum,insert_museum
from sightseen import create_sightseen,insert_sightseen
from park import create_park,insert_park
import os

def create_database():
    host=os.getenv('MYSQL_HOST', 'localhost')
    user=os.getenv('MYSQL_USERNAME', 'root')
    password=os.getenv('MYSQL_PASSWORD', '')
    database=os.getenv('MYSQL_DATABASE', 'NavigateCity')
    #port = int(os.getenv('MYSQL_PORT', 3306))

    # read from variables.txt:
    with open('variables.txt', 'r') as f:
        lines = f.readlines()
        host = lines[0].strip().split('=')[1]
        database = lines[1].strip().split('=')[1]
        user = lines[2].strip().split('=')[1]
        password = lines[3].strip().split('=')[1]

    #print check:
    print(f"Connecting to MySQL at {host} with user {user} and database {database}")


    #Start a connection
    db = pymysql.connect(host=host, user=user, password=password)

    #Create the database
    crsc = db.cursor()

    #Drop the database if already exists
    #Ref: https://stackoverflow.com/questions/25026244/how-to-get-the-mysql-type-of-error-with-pymysql
    try:
        crsc.execute(f"DROP DATABASE {database};")
    except pymysql.err.DatabaseError:
        pass

    #Create Datatbase
    crsc.execute(f"CREATE DATABASE {database};")

    #Access the database
    crsc.execute(f"USE {database};")

    #Create tables
    crsc.execute(create_city())
    crsc.execute(create_restaurant())
    crsc.execute(create_food())
    crsc.execute(create_museum())
    crsc.execute(create_sightseen())
    crsc.execute(create_park())

    #Insert data to the tables
    crsc.execute(insert_city())
    crsc.execute(insert_museum())
    crsc.execute(insert_sightseen())
    crsc.execute(insert_park())
    crsc.execute(insert_restaurant())
    crsc.execute(insert_food())

    #Save any changes to the database
    db.commit()

create_database()


