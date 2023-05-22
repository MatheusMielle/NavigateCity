# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023


def create_city():
    
    sql = "CREATE TABLE City ("
    sql += "City_ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,"
    sql += "City_name VARCHAR(50) NOT NULL,"
    sql += "Country VARCHAR(50) NOT NULL,"
    sql += "Continent VARCHAR(20) NOT NULL"
    sql += ");"

    return sql

def insert_city():
    sql = "INSERT INTO City (City_name, Country, Continent) VALUES "

    file = open("./data/Cities.csv", "r") #open data file 

    #get every line of the file
    for line in file:
        city = (line.split(","))[0] #getting the first element when splitting the line
        country = (line.split(","))[1] #getting the second element when splitting the line
        continent = (line.split(","))[2] 
        continent = continent[:-1] #remove the \n at the end

        sql += "('"
        sql += city
        sql += "', '"
        sql += country
        sql += "', '"
        sql += continent
        sql += "'), "
    
    #remove the , from the last element and add ;
    sql = sql[:-2]
    sql += ";"
    return sql

