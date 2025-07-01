# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023

import csv

def create_sightseen():

    sql = "CREATE TABLE Famous_Sight ("
    sql += "Sight_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"
    sql += "Sight_name VARCHAR(100) NOT NULL,"
    sql += "City_ID INT NOT NULL,"
    sql += "Description TEXT,"
    sql += "FOREIGN KEY (City_ID) REFERENCES City(City_ID)"
    sql += ");"

    return sql.lower()

def insert_sightseen():
    sql = "INSERT INTO Famous_Sight(Sight_name, City_ID, Description) VALUES "
    sql = sql.lower()

    file = csv.reader(open("./data/Sights.csv", 'r', encoding='utf-8'))
    for row in file:
        s_name = row[0]
        city_id = row[1]
        s_desc= row[2] 

        # Escape quotes in string values
        s_name = s_name.replace("'", "''")
        s_desc = s_desc.replace("'", "''")

        # Build SQL query string
        # Make sure no value is empty, if so == NULL:
        if len(s_desc) == 0:
            s_desc = "NULL" 
            values = "('{}', {}, {})".format(s_name, city_id, s_desc)
        else:
            values = "('{}', {}, '{}')".format(s_name, city_id, s_desc)
            
        sql += values + ", "

    #remove the , from the last element and add ;
    sql = sql[:-2]
    sql += ";"
    return sql
