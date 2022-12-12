
import React from "react";
import { Link } from "react-router-dom";


function PageNotFound() {
 
  return (
    <div>
     
   <section className="content">
    <br></br>
    <br></br>
  <div className="error-page">
    
    <div className="error-content">
      <h3><i className="fas fa-exclamation-triangle text-warning" /> Page introuvable</h3>
      <p>
      <Link to="./">retourner vers la page connexion</Link>
      </p>
    </div>
    {/* /.error-content */}
  </div>
  {/* /.error-page */}
</section>

    </div>
  );
}

export default PageNotFound;
