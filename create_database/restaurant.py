# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023

import csv

def create_restaurant():

    sql = "CREATE TABLE Restaurant ("
    sql += "Rest_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"
    sql += "Rest_name VARCHAR(100) NOT NULL,"
    sql += "City_ID INT NOT NULL,"
    sql += "Avg_Price_USD DECIMAL(6, 2),"
    sql += "Description TEXT,"
    sql += "FOREIGN KEY (City_ID) REFERENCES City(City_ID)"
    sql += ");"

    return sql.lower()

def insert_restaurant():
    sql = "INSERT INTO Restaurant(Rest_name, City_ID, Avg_Price_USD, Description) VALUES "
    sql = sql.lower()

    file = csv.reader(open("./data/Restaurants.csv", 'r', encoding='utf-8'))
    for row in file:
        r_name = row[0]
        city_id = row[1]
        r_price = row[2]
        r_desc= row[3] 

        # Escape quotes in string values
        r_name = r_name.replace("'", "''")
        r_price = r_price.replace("'", "''")
        r_desc = r_desc.replace("'", "''")

        # Build SQL query string
        # Make sure no value is empty, if so == NULL:
        if len(r_price) == 0:
            r_price = "NULL"
            values = "('{}', {}, {}, '{}')".format(r_name, city_id, r_price, r_desc)
        elif len(r_desc) == 0:
            r_desc = "NULL" 
            values = "('{}', {}, {}, {})".format(r_name, city_id, r_price, r_desc)
        else:
            values = "('{}', {}, {}, '{}')".format(r_name, city_id, r_price, r_desc)
            
        sql += values + ", "

    #remove the , from the last element and add ;
    sql = sql[:-2]
    sql += ";"
    return sql