import React, { useState, useEffect } from "react";
import "../styles/Park.css";
import WarningMessages from "./WarningMessages";

interface ParkData {
  park_id: number;
  city_name: string;
  continent: string;
  country: string;
  description: string;
  park_name: string;
  type: string;
}

interface ParkProps {
  location: string;
  name: string;
  category: string;
}

const Park: React.FC<ParkProps> = ({ location, name, category }) => {
  const [parks, setParks] = useState<ParkData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParks = async () => {
    try {
      setLoading(true);
      setError(null);
      let response: Response;
      if (location == "all" && name == "the World") {
        response = await fetch(
          `http://localhost:5001/api/get-random/${category}`
        );
      } else {
        response = await fetch(
          `http://localhost:5001/api/get-result/${location}/${name}/${category}`
        );
      }
      if (!response.ok) {
        throw new Error("Failed to fetch park data");
      }

      const data = await response.json();
      setParks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchParks();
  };

  useEffect(() => {
    fetchParks();
  }, [location, name, category]);

  if (loading) {
    return (
      <WarningMessages
        type="loading"
        message="Exploring green spaces and natural areas..."
        spinnerColor="text-success"
      />
    );
  }

  if (error) {
    return (
      <WarningMessages
        type="error"
        message="Oops! We couldn't explore the parks right now. Please try again."
        details={error}
        iconClass="bi bi-exclamation-triangle text-warning"
      />
    );
  }

  if (parks.length === 0) {
    return (
      <WarningMessages
        type="no-results"
        title="No Parks Found"
        message="We couldn't find any parks or recreational areas for your search criteria."
        details="Try searching for a different location or category."
        iconClass="bi bi-trees text-success"
      />
    );
  }

  return (
    <div className="park-container">
      <div className="park-header">
        <h2 className="park-title">
          <i className="bi bi-tree-fill"></i>
          Parks in {name}
        </h2>
        <div className="park-header-actions">
          <p className="park-count">
            {parks.length} park{parks.length !== 1 ? "s" : ""} and recreational area{parks.length !== 1 ? "s" : ""} found{" "}
            {location == "all" ? "- Refresh to see more" : ""}
          </p>
          {location == "all" && (
            <button 
              className="park-refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
              title="Get new random parks"
            >
              <i className="bi bi-arrow-clockwise"></i>
              {loading ? "Loading..." : "Refresh"}
            </button>
          )}
        </div>
      </div>

      <div className="park-grid">
        {parks.map((park, index) => (
          <div key={index} className="park-card">
            <div className="park-card-header">
              <h3 className="park-name">{park.park_name}</h3>
              <span className="park-type">
                {park.type}
              </span>
            </div>

            <div className="park-location">
              <i className="bi bi-geo-alt-fill"></i>
              <span>
                {park.city_name}, {park.country}
              </span>
              <small className="park-continent">{park.continent}</small>
            </div>

            <div className="park-description">
              <p>{park.description}</p>
            </div>

            <div className="park-footer">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  park.park_name + " " + park.city_name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="park-btn park-explore-btn"
              >
                <i className="bi bi-compass-fill"></i>
                Explore Park
              </a>
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(
                  park.park_name + " " + park.city_name + " " + park.country
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="park-btn park-map-btn"
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

export default Park;