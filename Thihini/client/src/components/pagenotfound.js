import React from "react";
import "./component.css";

function PageNotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h2 className="text-404">404</h2>
        <h5 className="pagenotfound-text">Page Not Found</h5>
      </div>
    </div>
  );
}

export default PageNotFound;
