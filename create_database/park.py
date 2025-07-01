# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023

import csv

def create_park():

    sql = "CREATE TABLE Park ("
    sql += "Park_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"
    sql += "Park_name VARCHAR(65) NOT NULL,"
    sql += "City_ID INT NOT NULL,"
    sql += "Type VARCHAR(50),"
    sql += "Description TEXT,"
    sql += "FOREIGN KEY (City_ID) REFERENCES City(City_ID)"
    sql += ");"

    return sql.lower()

def insert_park():
    sql = "INSERT INTO Park(Park_name, City_ID, Type, Description) VALUES "
    sql = sql.lower()

    file = csv.reader(open("./data/Parks.csv", 'r', encoding='utf-8'))
    for row in file:
        p_name = row[0]
        city_id = row[1]
        p_type = row[2]
        p_desc= row[3] 

        # Escape quotes in string values
        p_name = p_name.replace("'", "''")
        p_type = p_type.replace("'", "''")
        p_desc = p_desc.replace("'", "''")

        # Build SQL query string
        # Ref.:https://www.w3schools.com/python/ref_string_format.asphttps://www.w3schools.com/python/ref_string_format.asp
        #make sure no value is empty, if so == NULL:
        if len(p_type) == 0:
            p_type = "NULL"
            values = "('{}', {}, {}, '{}')".format(p_name, city_id, p_type, p_desc)
        elif len(p_desc) == 0:
            p_desc = "NULL" 
            values = "('{}', {}, '{}', {})".format(p_name, city_id, p_type, p_desc)
        else:
            values = "('{}', {}, '{}', '{}')".format(p_name, city_id, p_type, p_desc)
            
        sql += values + ", "

    #remove the , from the last element and add ;
    sql = sql[:-2]
    sql += ";"
    return sql