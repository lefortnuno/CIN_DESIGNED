import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const seDeconnecter = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-secondary justify-content-center">
      <ul className="navbar-nav">
        {userToken ? (
          <>
            <li className="nav-item">
              <a onClick={seDeconnecter} className="nav-link">
                Deconnection
              </a>
            </li>
            <li className="nav-item">
              <Link to="/utilisateur/" className="nav-link">
                Gestion des Utilisateurs
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Connection
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
