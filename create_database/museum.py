# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023


import csv

def create_museum():

    sql = "CREATE TABLE Museum ("
    sql += "Museum_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"
    sql += "Museum_name VARCHAR(100) NOT NULL,"
    sql += "City_ID INT NOT NULL,"
    sql += "Type VARCHAR(50),"
    sql += "Description TEXT,"
    sql += "FOREIGN KEY (City_ID) REFERENCES City(City_ID)"
    sql += ");"

    return sql

def insert_museum():
    sql = "INSERT INTO Museum (Museum_name, City_ID, Type, Description) VALUES "

    #Ref.:https://stackoverflow.com/questions/49562499/how-to-fix-unicodedecodeerror-charmap-codec-cant-decode-byte-0x9d-in-posit 
    file = csv.reader(open("./data/Museums.csv", 'r', encoding='utf-8'))
    for row in file:
        m_name = row[0]
        city_id = row[1]
        m_type = row[2]
        m_desc= row[3] 

        # Escape quotes in string values
        m_name = m_name.replace("'", "''")
        m_type = m_type.replace("'", "''")
        m_desc = m_desc.replace("'", "''")

        # Build SQL query string
        # Ref.:https://www.w3schools.com/python/ref_string_format.asphttps://www.w3schools.com/python/ref_string_format.asp
        #make sure no value is empty, if so == NULL:
        if len(m_type) == 0:
            m_type = "NULL"
            values = "('{}', {}, {}, '{}')".format(m_name, city_id, m_type, m_desc)
        elif len(m_desc) == 0:
            m_desc = "NULL" 
            values = "('{}', {}, '{}', {})".format(m_name, city_id, m_type, m_desc)
        else:
            values = "('{}', {}, '{}', '{}')".format(m_name, city_id, m_type, m_desc)
            
        sql += values + ", "

    #remove the , from the last element and add ;
    sql = sql[:-2]
    sql += ";"
    return sql
