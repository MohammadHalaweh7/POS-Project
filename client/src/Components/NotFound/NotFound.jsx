import React from "react";

export default function NotFound() {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-4">404 - Page Not Found</h1>
        <p className="lead">The requested page could not be found.</p>
        <span role="img" aria-label="Sad" style={{ fontSize: "50px" }}>
          😞
        </span>
      </div>
    </div>
  );
}
