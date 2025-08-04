from duckduckgo_search import DDGS

results = DDGS().images(keywords="Acropolis Museum Athens Greece", region="en-us", safesearch="on", max_results=1)

print(results[0]['image'])