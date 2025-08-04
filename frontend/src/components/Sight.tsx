import React, { useState, useEffect } from "react";
import "../styles/Sight.css";
import WarningMessages from "./WarningMessages";

interface SightData {
  sight_id: number;
  city_id: number;
  city_name: string;
  continent: string;
  country: string;
  description: string;
  sight_name: string;
}

interface SightProps {
  location: string;
  name: string;
  category: string;
}

const Sight: React.FC<SightProps> = ({ location, name, category }) => {
  const [sights, setSights] = useState<SightData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSights = async () => {
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
        throw new Error("Failed to fetch sights data");
      }

      const data = await response.json();
      setSights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchSights();
  };

  useEffect(() => {
    fetchSights();
  }, [location, name, category]);

  if (loading) {
    return (
      <WarningMessages
        type="loading"
        message="Discovering amazing sights and landmarks..."
        spinnerColor="text-info"
      />
    );
  }

  if (error) {
    return (
      <WarningMessages
        type="error"
        message="Sorry, we couldn't load the sights. Please try again."
        details={error}
        iconClass="bi bi-exclamation-triangle"
      />
    );
  }

  if (sights.length === 0) {
    return (
      <WarningMessages
        type="no-results"
        title="No Sights Found"
        message="We couldn't find any famous sights for your search criteria."
        iconClass="bi bi-binoculars"
      />
    );
  }

  return (
    <div className="sight-container">
      <div className="sight-header">
        <h2 className="sight-title">
          <i className="bi bi-camera-fill"></i>
          Famous Sights in {name}
        </h2>
        <div className="sight-header-actions">
          <p className="sight-count">
            {sights.length} sight{sights.length !== 1 ? "s" : ""} found{" "}
            {location == "all" ? "- Refresh to see more" : ""}
          </p>
          {location == "all" && (
            <button 
              className="sight-refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
              title="Get new random sights"
            >
              <i className="bi bi-arrow-clockwise"></i>
              {loading ? "Loading..." : "Refresh"}
            </button>
          )}
        </div>
      </div>

      <div className="sight-grid">
        {sights.map((sight, index) => (
          <div key={index} className="sight-card">
            <div className="sight-card-header">
              <h3 className="sight-name">{sight.sight_name}</h3>
              <span className="sight-landmark-badge">Landmark</span>
            </div>

            <div className="sight-location">
              <i className="bi bi-geo-alt-fill"></i>
              <span>
                {sight.city_name}, {sight.country}
              </span>
              <small className="sight-continent">{sight.continent}</small>
            </div>

            <div className="sight-description">
              <p>{sight.description}</p>
            </div>

            <div className="sight-footer">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  sight.sight_name + " " + sight.city_name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sight-btn sight-explore-btn"
              >
                <i className="bi bi-compass-fill"></i>
                Explore Sight
              </a>
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(
                  sight.sight_name +
                    " " +
                    sight.city_name +
                    " " +
                    sight.country
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sight-btn sight-map-btn"
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

export default Sight;
