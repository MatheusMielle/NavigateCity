import React from "react";
import "../styles/WarningMessages.css";

type WarningType = "loading" | "error" | "no-results";

interface WarningMessagesProps {
  type: WarningType;
  message?: string;
  details?: string;
  iconClass?: string;
  spinnerColor?: string;
  title?: string;
}

const WarningMessages: React.FC<WarningMessagesProps> = ({
  type,
  message,
  details,
  iconClass,
  spinnerColor = "text-primary",
  title
}) => {
  const renderContent = () => {
    switch (type) {
      case "loading":
        return (
          <>
            <div className={`spinner-border loading-spinner ${spinnerColor}`} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="loading-message">{message || "Loading..."}</p>
          </>
        );

      case "error":
        return (
          <>
            <i className={`error-icon ${iconClass || "bi bi-exclamation-triangle"}`}></i>
            <p className="error-message">{message || "Something went wrong. Please try again."}</p>
            {details && <small className="error-details">{details}</small>}
          </>
        );

      case "no-results":
        return (
          <>
            <i className={`no-results-icon ${iconClass || "bi bi-search"}`}></i>
            <h3 className="no-results-title">{title || "No Results Found"}</h3>
            <p className="no-results-message">{message || "We couldn't find any results for your search criteria."}</p>
            {details && <small className="no-results-details">{details}</small>}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="result-container">
      <div className="warning-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default WarningMessages;
