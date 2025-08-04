import React, { useState, useEffect } from "react";
import "../styles/Dish.css";
import WarningMessages from "./WarningMessages";

interface DishData {
  avg_price_usd: string;
  city_id: number;
  city_name: string;
  continent: string;
  country: string;
  description: string;
  dish_name: string;
  food_id: number;
  price_usd: string;
  rest_id: number;
  rest_name: string;
  restaurant_id: number;
}

interface DishProps {
  location: string;
  name: string;
  category: string;
}

const Dish: React.FC<DishProps> = ({ location, name, category }) => {
  const [dishes, setDishes] = useState<DishData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDishes = async () => {
    try {
      setLoading(true);
      setError(null);
      let response: Response;
      if (location == "all" && name == "the World") {
        response = await fetch(
          `/api/get-random/${category}`
        );
      } else {
        response = await fetch(
          `/api/get-result/${location}/${name}/${category}`
        );
      }
      if (!response.ok) {
        throw new Error("Failed to fetch dish data");
      }

      const data = await response.json();
      setDishes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDishes();
  };

  useEffect(() => {
    fetchDishes();
  }, [location, name, category]);

  if (loading) {
    return (
      <WarningMessages
        type="loading"
        message="Discovering delicious dishes..."
        spinnerColor="text-primary"
      />
    );
  }

  if (error) {
    return (
      <WarningMessages
        type="error"
        message="Sorry, we couldn't load the dishes. Please try again."
        details={error}
        iconClass="bi bi-exclamation-triangle"
      />
    );
  }

  if (dishes.length === 0) {
    return (
      <WarningMessages
        type="no-results"
        title="No Dishes Found"
        message="We couldn't find any dishes for your search criteria."
        iconClass="bi bi-search"
      />
    );
  }

  return (
    <div className="dish-container">
      <div className="dish-header">
        <h2 className="dish-title">
          <i className="bi bi-fork-knife"></i>
          Local Dishes in {name}
        </h2>
        <div className="dish-header-actions">
          <p className="dish-count">
            {dishes.length} dish{dishes.length !== 1 ? "es" : ""} found{" "}
            {location == "all" ? "- Refresh to see more" : ""}
          </p>
          {location == "all" && (
            <button 
              className="dish-refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
              title="Get new random dishes"
            >
              <i className="bi bi-arrow-clockwise"></i>
              {loading ? "Loading..." : "Refresh"}
            </button>
          )}
        </div>
      </div>

      <div className="dish-grid">
        {dishes.map((dish, index) => (
          <div key={index} className="dish-card">
            <div className="dish-card-header">
              <h3 className="dish-name">{dish.dish_name}</h3>
              <div className="dish-price-group">
                <span className="dish-price-badge">${dish.price_usd}</span>
              </div>
            </div>

            <div className="dish-location">
              <i className="bi bi-geo-alt-fill"></i>
              <span>
                {dish.city_name}, {dish.country}
              </span>
              <small className="dish-continent">{dish.continent}</small>
            </div>

            <div className="dish-restaurant">
              <i className="bi bi-shop"></i>
              <span className="dish-restaurant-name">{dish.rest_name}</span>
              <small className="dish-avg-price">Avg: ${dish.avg_price_usd}</small>
            </div>

            <div className="dish-description">
              <p>{dish.description}</p>
            </div>

            <div className="dish-footer">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  dish.dish_name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dish-btn dish-explore-btn"
              >
                <i className="bi bi-search"></i>
                Learn More
              </a>
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(
                  dish.rest_name +
                    " " +
                    dish.city_name +
                    " " +
                    dish.country
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="dish-btn dish-map-btn"
              >
                <i className="bi bi-map-fill"></i>
                Find Restaurant
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dish;
