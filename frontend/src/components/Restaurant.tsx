import React, { useState, useEffect } from "react";
import "../styles/Restaurant.css";
import WarningMessages from "./WarningMessages";

interface RestaurantData {
  rest_id: number;
  city_id: number;
  city_name: string;
  continent: string;
  country: string;
  description: string;
  rest_name: string;
  avg_price_usd: string;
}

interface RestaurantProps {
  location: string;
  name: string;
  category: string;
}

const Restaurant: React.FC<RestaurantProps> = ({ location, name, category }) => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      let response: Response;
      if (location == "all" && name == "the World") {
        response = await fetch(
          `/navigatecity/api/get-random/${category}`
        );
      } else {
        response = await fetch(
          `/navigatecity/api/get-result/${location}/${name}/${category}`
        );
      }
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
      }

      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchRestaurants();
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return `$${numPrice.toFixed(2)}`;
  };

  const getPriceCategory = (price: string) => {
    const numPrice = parseFloat(price);
    if (numPrice <= 15) return "Budget-Friendly";
    if (numPrice <= 25) return "Mid-Range";
    return "Fine Dining";
  };

  useEffect(() => {
    fetchRestaurants();
  }, [location, name, category]);

  if (loading) {
    return (
      <WarningMessages
        type="loading"
        message="Finding delicious restaurants..."
        spinnerColor="text-warning"
      />
    );
  }

  if (error) {
    return (
      <WarningMessages
        type="error"
        message="Sorry, we couldn't load the restaurants. Please try again."
        details={error}
        iconClass="bi bi-exclamation-triangle"
      />
    );
  }

  if (restaurants.length === 0) {
    return (
      <WarningMessages
        type="no-results"
        title="No Restaurants Found"
        message="We couldn't find any restaurants for your search criteria."
        iconClass="bi bi-search"
      />
    );
  }

  return (
    <div className="restaurant-container">
      <div className="restaurant-header">
        <h2 className="restaurant-title">
          <i className="bi bi-cup-hot-fill"></i>
          Restaurants in {name}
        </h2>
        <div className="restaurant-header-actions">
          <p className="restaurant-count">
            {restaurants.length} restaurant{restaurants.length !== 1 ? "s" : ""} found{" "}
            {location == "all" ? "- Refresh to see more" : ""}
          </p>
          {location == "all" && (
            <button 
              className="restaurant-refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
              title="Get new random restaurants"
            >
              <i className="bi bi-arrow-clockwise"></i>
              {loading ? "Loading..." : "Refresh"}
            </button>
          )}
        </div>
      </div>

      <div className="restaurant-grid">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="restaurant-card">
            <div className="restaurant-card-header">
              <h3 className="restaurant-name">{restaurant.rest_name}</h3>
              <div className="restaurant-badges">
                <span className="restaurant-category-badge">
                  {getPriceCategory(restaurant.avg_price_usd)}
                </span>
              </div>
            </div>

            <div className="restaurant-location">
              <i className="bi bi-geo-alt-fill"></i>
              <span>
                {restaurant.city_name}, {restaurant.country}
              </span>
              <small className="restaurant-continent">{restaurant.continent}</small>
            </div>

            <div className="restaurant-description">
              <p>{restaurant.description}</p>
            </div>

            <div className="restaurant-price-info">
              <div className="price-indicator">
                <i className="bi bi-currency-dollar"></i>
                <span>Average Price: <strong>{formatPrice(restaurant.avg_price_usd)}</strong></span>
              </div>
            </div>

            <div className="restaurant-footer">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  restaurant.rest_name + " restaurant " + restaurant.city_name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="restaurant-btn restaurant-explore-btn"
              >
                <i className="bi bi-compass-fill"></i>
                Explore Restaurant
              </a>
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(
                  restaurant.rest_name +
                    " restaurant " +
                    restaurant.city_name +
                    " " +
                    restaurant.country
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="restaurant-btn restaurant-map-btn"
              >
                <i className="bi bi-map-fill"></i>
                View Map
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
