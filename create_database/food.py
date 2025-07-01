# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023


import csv

def create_food():

    sql = "CREATE TABLE Food ("
    sql += "Food_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"
    sql += "Dish_name VARCHAR(100) NOT NULL,"
    sql += "Restaurant_ID INT NOT NULL,"
    sql += "Price_USD DECIMAL(6, 2),"
    sql += "Description TEXT,"
    sql += "FOREIGN KEY (Restaurant_ID) REFERENCES Restaurant(Rest_ID)"
    sql += ");"

    return sql.lower()

def insert_food():
    sql = "INSERT INTO Food(Dish_name, Restaurant_ID, Price_USD, Description) VALUES "
    sql = sql.lower()

    file = csv.reader(open("./data/Foods.csv", 'r', encoding='utf-8'))
    for row in file:
        f_name = row[0]
        rest_id = row[1]
        f_price = row[2]
        f_desc= row[3] 

        # Escape quotes in string values
        f_name = f_name.replace("'", "''")
        f_price = f_price.replace("'", "''")
        f_desc = f_desc.replace("'", "''")

        # Build SQL query string
        # Make sure no value is empty, if so == NULL:
        if len(f_price) == 0:
            f_price = "NULL"
            values = "('{}', {}, {}, '{}')".format(f_name, rest_id, f_price, f_desc)
        elif len(f_desc) == 0:
            f_desc = "NULL" 
            values = "('{}', {}, {}, {})".format(f_name, rest_id, f_price, f_desc)
        else:
            values = "('{}', {}, {}, '{}')".format(f_name, rest_id, f_price, f_desc)
            
        sql += values + ", "

    #remove the , from the last element and add ;
    sql = sql[:-2]
    sql += ";"
    return sql
