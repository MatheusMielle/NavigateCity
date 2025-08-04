import React, { useState, useEffect } from "react";
import "../styles/Museum.css";
import WarningMessages from "./WarningMessages";

interface MuseumData {
  city_name: string;
  continent: string;
  country: string;
  description: string;
  museum_name: string;
  type: string;
}

interface MuseumProps {
  location: string;
  name: string;
  category: string;
}

const Museum: React.FC<MuseumProps> = ({ location, name, category }) => {
  const [museums, setMuseums] = useState<MuseumData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMuseums = async () => {
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
        throw new Error("Failed to fetch museum data");
      }

      const data = await response.json();
      setMuseums(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchMuseums();
  };

  useEffect(() => {
    fetchMuseums();
  }, [location, name, category]);

  if (loading) {
    return (
      <WarningMessages
        type="loading"
        message="Discovering amazing museums..."
        spinnerColor="text-primary"
      />
    );
  }

  if (error) {
    return (
      <WarningMessages
        type="error"
        message="Sorry, we couldn't load the museums. Please try again."
        details={error}
        iconClass="bi bi-exclamation-triangle"
      />
    );
  }

  if (museums.length === 0) {
    return (
      <WarningMessages
        type="no-results"
        title="No Museums Found"
        message="We couldn't find any museums for your search criteria."
        iconClass="bi bi-search"
      />
    );
  }

  return (
    <div className="museum-container">
      <div className="museum-header">
        <h2 className="museum-title">
          <i className="bi bi-bank2"></i>
          Museums in {name}
        </h2>
        <div className="museum-header-actions">
          <p className="museum-count">
            {museums.length} museum{museums.length !== 1 ? "s" : ""} found{" "}
            {location == "all" ? "- Refresh to see more" : ""}
          </p>
          {location == "all" && (
            <button 
              className="museum-refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
              title="Get new random museums"
            >
              <i className="bi bi-arrow-clockwise"></i>
              {loading ? "Loading..." : "Refresh"}
            </button>
          )}
        </div>
      </div>

      <div className="museum-grid">
        {museums.map((museum, index) => (
          <div key={index} className="museum-card">
            <div className="museum-card-header">
              <h3 className="museum-name">{museum.museum_name}</h3>
              <span className="museum-type-badge">{museum.type}</span>
            </div>

            <div className="museum-location">
              <i className="bi bi-geo-alt-fill"></i>
              <span>
                {museum.city_name}, {museum.country}
              </span>
              <small className="museum-continent">{museum.continent}</small>
            </div>

            <div className="museum-description">
              <p>{museum.description}</p>
            </div>

            <div className="museum-footer">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  museum.museum_name + " " + museum.city_name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="museum-btn museum-explore-btn"
              >
                <i className="bi bi-compass-fill"></i>
                Explore Museum
              </a>
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(
                  museum.museum_name +
                    " " +
                    museum.city_name +
                    " " +
                    museum.country
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="museum-btn museum-map-btn"
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

export default Museum;
