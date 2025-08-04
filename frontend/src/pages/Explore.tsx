import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "../styles/Explore.css";
import Header from "../components/Header";

interface PlaceData {
  cities: string[];
  countries: string[];
  continents: string[];
}

const Explore = () => {
  const [placeData, setPlaceData] = useState<PlaceData>({
    cities: [],
    countries: [],
    continents: [],
  });

  const categories = [
    { label: "Museums", value: "museum" },
    { label: "Parks", value: "park" },
    { label: "Famous Sightseeing", value: "famous_sight" },
    { label: "Restaurants", value: "restaurant" },
    { label: "Dishes", value: "food" },
  ];

  const [selectedLocation, setSelectedLocation] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<{
    label: string;
    value: string;
  } | null>(null);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const res = await fetch("/navigatecity/api/get-places");
        const data: PlaceData = await res.json();
        setPlaceData(data);
      } catch (err) {
        console.error("Failed to fetch place data:", err);
      }
    };
    fetchPlaceData();
  }, []);

  const groupedOptions = [
    {
      label: "Cities",
      options: placeData.cities
        .sort()
        .map((city) => ({ label: city, value: city })),
    },
    {
      label: "Countries",
      options: placeData.countries.sort().map((country) => ({
        label: country,
        value: country,
      })),
    },
    {
      label: "Continents",
      options: placeData.continents.sort().map((continent) => ({
        label: continent,
        value: continent,
      })),
    },
  ];

  const categoryOptions = categories;

  const findLocationType = (locationValue: string): string | null => {
    if (placeData.cities.includes(locationValue)) return "city_name";
    if (placeData.countries.includes(locationValue)) return "country";
    if (placeData.continents.includes(locationValue)) return "continent";
    return null;
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!selectedLocation || !selectedCategory) return;

    const locationType = findLocationType(selectedLocation.value);
    if (!locationType) return;

    const queryParams = `location=${encodeURIComponent(
      locationType
    )}&name=${encodeURIComponent(
      selectedLocation.value
    )}&category=${encodeURIComponent(selectedCategory.value.toLowerCase())}`;

    navigate(`/results?${queryParams}`);
  };

  const isSearchDisabled = !selectedLocation || !selectedCategory;

  return (
    <section className="explore-section">
      <div className="explore-background" />
      <Header />

      <div className="explore-content container">
        <div className="explore-hero">
          <h1 className="explore-title">Explore Your Next Adventure</h1>
          <p className="explore-subtitle">
            Discover amazing places, delicious food, and unforgettable
            experiences in cities around the world.
          </p>
        </div>

        <div className="explore-search">
          <h2>Start Your Journey</h2>
          <div className="search-form">
            <div className="row g-3">
              {/* Location Dropdown */}
              <div className="col-md-4">
                <Select
                  options={groupedOptions}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  placeholder="Select a Location"
                  isClearable
                  isSearchable
                  classNamePrefix="react-select"
                />
              </div>

              {/* Category Dropdown (non-searchable) */}
              <div className="col-md-4">
                <Select<{ label: string; value: string }>
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Choose Category"
                  isClearable
                  isSearchable={false}
                  classNamePrefix="react-select"
                />
              </div>

              {/* Search Button */}
              <div className="col-md-4">
                <button
                  className="btn btn-primary w-100"
                  disabled={isSearchDisabled}
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Exploration Categories */}
        <div className="explore-categories">
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-bank2"></i>
                </div>
                <h3>Museums</h3>
                <p>
                  Immerse yourself in art, culture, and history at world-class
                  museums.
                </p>
                <button
                  className="category-btn"
                  onClick={() =>
                    navigate(
                      "/results?location=all&name=the%20World&category=museum"
                    )
                  }
                >
                  Browse Museums
                </button>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-tree-fill"></i>
                </div>
                <h3>Parks</h3>
                <p>
                  Explore beautiful parks and outdoor spaces for relaxation and
                  recreation.
                </p>
                <button
                  className="category-btn"
                  onClick={() =>
                    navigate(
                      "/results?location=all&name=the%20World&category=park"
                    )
                  }
                >
                  Visit Parks
                </button>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-camera"></i>
                </div>
                <h3>Famous Sightseeing</h3>
                <p>
                  Discover iconic landmarks and must-see attractions around the
                  world.
                </p>
                <button
                  className="category-btn"
                  onClick={() =>
                    navigate(
                      "/results?location=all&name=the%20World&category=famous_sight"
                    )
                  }
                >
                  Explore Sights
                </button>
              </div>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-shop"></i>
                </div>
                <h3>Restaurants</h3>
                <p>
                  Find the best dining experiences and local culinary hotspots.
                </p>
                <button
                  className="category-btn"
                  onClick={() =>
                    navigate(
                      "/results?location=all&name=the%20World&category=restaurant"
                    )
                  }
                >
                  Find Restaurants
                </button>
              </div>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className="category-card">
                <div className="category-icon">
                  <i className="bi bi-fork-knife"></i>
                </div>
                <h3>Dishes</h3>
                <p>
                  Explore traditional and signature dishes from different
                  cultures.
                </p>
                <button
                  className="category-btn"
                  onClick={() =>
                    navigate(
                      "/results?location=all&name=the%20World&category=food"
                    )
                  }
                >
                  Discover Dishes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
