import '../styles/Header.css'; // Importing the external CSS file for Header styles
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Importing Link for navigation

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <header className="home-header container">
      <Link to="/"><h2 className="logo">Navigate City</h2></Link>
      {!isHomePage && (
        <div className="nav-buttons">
          <button onClick={handleBackClick} className="nav-button back-button">
            <i className="bi bi-arrow-left"></i>
            Back
          </button>
          <a href='https://mmielle.com' className="nav-button home-button">
            <i className="bi bi-house"></i>
            Home
          </a>
        </div>
      )}
      {/* <a href="/chat" className="chat-button">
        Chat
      </a> */}
    </header>
  );
};

export default Header;
