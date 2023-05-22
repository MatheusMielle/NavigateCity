# Create Queries for NavigateCity
# Developed by: Matheus Mielle Silva and Bereket Lemma
# May 19th, 2023

# This program create some queries to be used in the website
# It saves the queries in the file queries.txt
# It should be saved in the format Query_name|SQL

import csv

# erase the file
with open("./queries/queries.txt", 'w') as file:
    file.write("")


def write_to_file(query):
    with open("./queries/queries.txt", 'a') as file:
        file.write(query)
    return


def places():
    file = csv.reader(open("./data/Cities.csv", 'r'))
    query_name = "{} in {}|"
    city_sql = []
    country_sql = []
    continent_sql = []
    places = ["Museums", "Parks", "Famous Sightseeing", "Restaurants", "Dishes"]

    #Museums
    city_sql.append("select c.City_name, m.Museum_name, m.Type, m.Description from city c join museum m on c.city_id = m.city_id where c.city_name = '{}'")
    country_sql.append("select c.City_name, c.Country, m.Museum_name, m.Type, m.Description from city c join museum m on c.city_id = m.city_id where c.country = '{}'")
    continent_sql.append("select c.City_name, c.Country, c.Continent, m.Museum_name, m.Type, m.Description from city c join museum m on c.city_id = m.city_id where c.continent = '{}'")
    
    #Parks
    city_sql.append("select c.City_name, p.Park_name, p.Type, p.Description from city c join park p on c.city_id = p.city_id where c.city_name = '{}'")
    country_sql.append("select c.City_name, c.Country, p.Park_name, p.Type, p.Description from city c join park p on c.city_id = p.city_id where c.country = '{}'")
    continent_sql.append("select c.City_name, c.Country, c.Continent, p.Park_name, p.Type, p.Description from city c join park p on c.city_id = p.city_id where c.continent = '{}'")
    

    #Sights
    city_sql.append("select c.City_name, s.sight_name, s.Description from city c join famous_sight s on c.city_id = s.city_id where c.city_name = '{}'")
    country_sql.append("select c.City_name, c.Country, s.sight_name, s.Description from city c join famous_sight s on c.city_id = s.city_id where c.country = '{}'")
    continent_sql.append("select c.City_name, c.Country, c.Continent, s.sight_name, s.Description from city c join famous_sight s on c.city_id = s.city_id where c.continent = '{}'")

    #Restaurants
    city_sql.append("select c.City_name, r.rest_name, r.Description, r.Avg_Price_USD from city c join restaurant r on c.city_id = r.city_id where c.city_name = '{}'")
    country_sql.append("select c.City_name, c.Country, r.rest_name, r.Description, r.Avg_Price_USD from city c join restaurant r on c.city_id = r.city_id where c.country = '{}'")
    continent_sql.append("select c.City_name, c.Country, c.Continent, r.rest_name, r.Description, r.Avg_Price_USD from city c join restaurant r on c.city_id = r.city_id where c.continent = '{}'")
    
    #Food
    city_sql.append("select f.Dish_name, f.Description, f.Price_USD, r.Rest_name, c.City_name from (city c join restaurant r on c.City_ID = r.City_ID) join food f on f.Restaurant_ID = r.Rest_ID where c.city_name = '{}'")
    country_sql.append("select f.Dish_name, f.Description, f.Price_USD, r.Rest_name, c.City_name, c.Country from (city c join restaurant r on c.City_ID = r.City_ID) join food f on f.Restaurant_ID = r.Rest_ID where c.country = '{}'")
    continent_sql.append("select f.Dish_name, f.Description, f.Price_USD, r.Rest_name, c.City_name, c.Country, c.Continent from (city c join restaurant r on c.City_ID = r.City_ID) join food f on f.Restaurant_ID = r.Rest_ID where c.continent = '{}'")

    #List to keep track of the countries and continents added
    countries = []
    continents = []

    for row in file:
        
        # City Query
        place_count = 0
        for sql in city_sql:
            query = query_name.format(places[place_count], row[0]) + sql.format(row[0]) + "\n"
            write_to_file(query)
            place_count += 1

        # Countries query
        place_count = 0
        if row[1] not in countries:
            countries.append(row[1])
            for sql in country_sql:
                query = query_name.format(places[place_count], row[1]) + sql.format(row[1]) + "\n"
                write_to_file(query)
                place_count += 1

        # Continents Query
        place_count = 0
        if row[2] not in continents:
            continents.append(row[2])
            for sql in continent_sql:
                query = query_name.format(places[place_count], row[2]) + sql.format(row[2]) + "\n"
                write_to_file(query)
                place_count += 1
    
def cities_in_country():
    file = csv.reader(open("./data/Cities.csv", 'r'))
    query_name = "Cities in {}"
    countries = []
    continents = []
    sql = "select City_name, Country, Continent from city where country = '{}' or continent = '{}';"

    for row in file:
        if row[1] not in countries:
            countries.append(row[1])
            query = (query_name.format(row[1]) + '|' + sql.format(row[1], row[1]) + '\n')
            write_to_file(query)

        if row[2] not in continents:
            continents.append(row[2])
            query = (query_name.format(row[2]) + '|' + sql.format(row[2], row[2]) + '\n')
            write_to_file(query)

def food():
    
    return



if __name__ == "__main__":
    places()
    cities_in_country()
