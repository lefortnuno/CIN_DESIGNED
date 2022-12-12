import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";

export default function SideBar() {
  const u_info = {
    u_token: localStorage.token,
    u_identification: localStorage.identification,
    u_attribut: localStorage.attribut,
    u_idUtilisateur: localStorage.idUtilisateur,
    u_etatUtilisateur: localStorage.etatUtilisateur,
  };

  const navigate = useNavigate();
  const seDeconnecter = () => {
    localStorage.clear();
    navigate("/");
  };
  //#region // RENDU HTML ----
  return (
    <>
      <nav className="side-bar">
        {u_info.u_token ? (
          <>
            <div className="user-p">
              <img src="img/user.jpg" />
              <h4>{u_info.u_identification}</h4>
            </div>
            <ul>
              <li>
                <Link to="/utilisateur/" className="nav-link">
                  G.Utilisateurs
                </Link>
              </li>
              <li>
                <Link to="/arrondissement/" className="nav-link">
                  G.Arrondissements
                </Link>
              </li>
              <li>
                <Link to="/origine/" className="nav-link">
                  G.Origines
                </Link>
              </li>
              <li>
                <Link to="/profession/" className="nav-link">
                  G.Professions
                </Link>
              </li>
              <li>
                <Link to="/procedure_cin/" className="nav-link">
                  G.Pocedures
                </Link>
              </li>
              <li>
                <Link to="/individu/" className="nav-link">
                  G.Individus
                </Link>
              </li>
              <li onClick={seDeconnecter}>
                <BsBoxArrowInRight />
                <span>Logout</span>
              </li>
            </ul>
          </>
        ) : (
          <>
            <div className="user-p">
              <img src="img/user.jpg" />
              <h4>Nom</h4>
            </div>
            <ul>
              <li>
                <span>Aide</span>
              </li>
            </ul>
          </>
        )}
      </nav>
    </>
  );
  //#endregion
}
