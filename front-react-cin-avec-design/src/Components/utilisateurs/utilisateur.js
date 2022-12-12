import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import {
  BsFillTrashFill,
  BsPencilSquare,
  BsEye,
  BsSearch,
} from "react-icons/bs";

import Header from "../../Context/Header";
import SideBar from "../../Context/SideBar";
import ModalEdition from "./ModalEdit";
import DeleteConfirmation from "../../Context/ModalSuppr";
import Button from "react-bootstrap/Button";

const URL_DE_BASE = `utilisateur/`;

//#region //

//#endregion

export default function Utilisateur() {
  //#region // MES VARIABLE
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const u_info = {
    u_token: localStorage.token,
    u_identification: localStorage.identification,
    u_attribut: localStorage.attribut,
    u_idUtilisateur: localStorage.idUtilisateur,
    u_etatUtilisateur: localStorage.etatUtilisateur,
  };
  //#endregion

  //#region // DONNEE UTILISATEUR
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.get(URL_DE_BASE, opts).then(function (response) {
      setUsers(response.data);
    });
  }
  //#endregion

  //#region // MODAL DELETE UTILISATEUR
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(
      `Etes vous sure de vouloir supprimer '${
        users.find((x) => x.numCompte === id).identification
      }'?`
    );
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = (id) => {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.delete(URL_DE_BASE + `${id}`, opts).then(function (response) {
      getUsers();
      toast.success(`Suppr Reussi`);
      setDisplayConfirmationModal(false);

      if (id === u_info.u_numCompte) {
        localStorage.clear();
        navigate("/");
      }
    });
  };
  //#endregion

  //#region // ----- MA RECHERCHE -----
  const [contenuTab, setContenuTab] = useState(true);
  function rechercheUtilisateur(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getUsers();
      setContenuTab(true);
    } else {
      axios.get(URL_DE_BASE + `recherche/${valeur}`).then((response) => {
        if (response.data.success) {
          setUsers(response.data.res);
          setContenuTab(true);
        } else {
          setUsers(response.data.res);
          setContenuTab(false);
        }
      });
    }
  }
  //#endregion

  //#region  //----- MY PAGINATION -----
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  function retourALaPremierPage() {
    setcurrentPage(1);
    console.log(currentPage);
    if (currentPage > 5) {
      setmaxPageNumberLimit(5);
      setminPageNumberLimit(0);
    }
  }

  const pages = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if (currentPage - 2 < minPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  //#endregion

  //#region // RENDU HTML ----
  return (
    <>
      <Header />

      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={id}
        message={deleteMessage}
      />

      <div className="body">
        <SideBar />

        <section className="section-1">
          <div className="headerContenu">
            <Link to={`inscription/`} className="nouveauCompte">
              Nouveau Compte
            </Link>
          </div>
          <div className="middleContenuPage">
            <div className="titleMiddlePage">
              <p className="h4 ">Liste des utilisateurs</p>
            </div>

            <div className="videMiddlePage">
              <span> </span>
            </div>
            
            <div className="rechercheInput">
              <input
                type="text"
                name="cin"
                className="form-control form-control-sm"
                onClick={retourALaPremierPage}
                onChange={rechercheUtilisateur}
                placeholder="rechercher un utilisateur ...."
                autoComplete="off"
              />
            </div>
          </div>

          <div className="mainContenu">
            <div className="table-responsive text-nowrap">
              <table className="table table-striped w-auto">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Identification</th>
                    <th scope="col">Role</th>
                    <th scope="col">etat Compte</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contenuTab && users.length !== 0 ? (
                    currentItems.map((user, key) => (
                      <tr key={key}>
                        <th scope="row">{user.idUtilisateur} </th>
                        <td>{user.identification}</td>
                        <td>{user.attribut}</td>
                        <td>{user.etatUtilisateur}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm m-1 waves-effect"
                            variant="default"
                            name="numCompteEdit"
                          >
                            <BsEye />
                          </button>

                          <Link
                            to={`./UEdition/${user.idUtilisateur}`}
                            type="button"
                            className="btn btn-outline-primary btn-sm m-1 waves-effect"
                            variant="default"
                            name="numeroIdentification"
                          >
                            <BsPencilSquare />
                          </Link>
                          <Button
                            type="button"
                            className="btn btn-outline-danger btn-sm m-1 waves-effect"
                            variant="default"
                            onClick={() => showDeleteModal(user.numCompte)}
                          >
                            <BsFillTrashFill />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-danger text-center">
                        La liste est vide ....
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <ul className="pageNumbers">
                <li>
                  <button
                    disabled={currentPage == pages[0] ? true : false}
                    onClick={handlePrevbtn}
                  >
                    Précédent
                  </button>
                </li>
                {renderPageNumbers}
                <li>
                  <button
                    disabled={
                      currentPage == pages[pages.length - 1] ? true : false
                    }
                    onClick={handleNextbtn}
                  >
                    Suivant
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
  //#endregion
}
