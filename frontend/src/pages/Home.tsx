import "../styles/Home.css"; // Importing the external CSS file
import Header from "../components/Header"; // Importing the Header component

const Home = () => {
  return (
    <section className="home-section">
      {/* Background Video */}
      <video
        className="home-video"
        src="demo.mp4"
        muted
        loop
        autoPlay
        playsInline
      />

      {/* Overlay */}
      <div className="home-overlay" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="home-content container">
        <h2 className="display-4 fw-bold">Ready for an adventure?</h2>
        <p className="lead">
          Welcome to NavigateCity, where adventure awaits. With stunning
          architecture, mouth-watering cuisine, and endless opportunities for
          exploration. 
          <br />
          So why wait? Come see for yourself and let the adventure
          begin!
        </p>
        <a href="/explore" className="btn btn-primary btn-lg">
          Explore
        </a>

        {/* Social / Navigation Links */}
        <ul className="social-icons list-inline mt-4">
          <li className="list-inline-item">
            <a href="/" className="text-white fs-3">
              <i className="bi bi-house-door-fill"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="https://github.com/MatheusMielle/NavigateCity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-3"
            >
              <i className="bi bi-github"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="https://linkedin.com/in/mmielle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-3"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
