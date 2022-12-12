import axios from "../../api/axios";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsFillTrashFill, BsPencilSquare, BsEye } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Header from "../../context/header";
import ModalAjout from "./ModalAjout";
import ModalEdition from "./ModalEdit";
import DeleteConfirmation from "../../context/ModalSuppr";

const BASE_URL = `individu/`;

console.log(BASE_URL);
export default function Individu() {
  const navigate = useNavigate();
  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.u_nom,
    u_prenom: localStorage.u_prenom,
    u_attribut: localStorage.u_attribut,
    u_photoPDP: localStorage.u_photoPDP,
    u_numCompte: localStorage.u_numCompte,
    u_etatCompte: localStorage.u_etatCompte,
  };

  //#region // MODAL AJOUT Individu
  const [show, setShow] = useState(false);
  const showAddModal = () => setShow(true);
  const closeAddModal = () => {
    getUsers();
    setShow(false);
  };
  //#endregion

  //#region // MODAL EDIT Individu
  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (numCompte) => {
    setNumCompteEdit(numCompte);
    setShowEdit(true);
  };
  const closeEditModal = () => {
    getUsers();
    setShowEdit(false);
  };
  //#endregion

  //#region // PAGE VOIR Individu
  const voirIndividu = (cin) => {
    navigate(`/individu/${cin}`)
  };
  //#endregion

  //#region // PAGE INDIVIDU
  const [numCIN, setNumCIN] = useState("");
  const [showPage, setShowPage] = useState(false);
  //#endregion

  //#region // DONNEE Individu
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    const opts = {
      headers: {
        Authorization: "Bearer " + u_info.u_token,
      },
    };
    axios.get(BASE_URL, opts).then(function (response) {
      setUsers(response.data);
      console.log(response.data);
    });
  }
  //#endregion

  //#region // MODAL DELETE Individu
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
    axios.delete(BASE_URL + `${id}`).then(function (response) {
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
  function rechercheIndividu(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getUsers();
      setContenuTab(true);
    } else {
      axios.get(BASE_URL + `recherche/${valeur}`).then((response) => {
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
      <div>
        <Header />

        <ModalAjout show={show} onHide={closeAddModal}>
          Nouveau CIN
        </ModalAjout>

        <ModalEdition showEdit={showEdit} onHide={closeEditModal}>
          {numCompteEdit}
        </ModalEdition>

        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          id={id}
          message={deleteMessage}
        />

        <h2>
          Liste des Individus
          <span> </span>
          <Button
            className="btn btn-sm btn-primary"
            variant="primary"
            onClick={showAddModal}
          >
            Ajout Individu
          </Button>
          <span> </span>
          <label>
            <input
              type="text"
              name="cin"
              className="form-control form-control-sm"
              onClick={retourALaPremierPage}
              onChange={rechercheIndividu}
              placeholder="rechercher un Individu ...."
              autoComplete="off"
            />
          </label>
        </h2>

        {/*  ----- TABLEAU LISTE IndividuS ----- */}
        <div className="table-responsive text-nowrap">
          <table className="table table-striped w-auto">
            <thead>
              <tr>
                <th scope="col">Numéro de CIN</th>
                <th scope="col">nom</th>
                <th scope="col">prenom</th>
                <th scope="col">né le à </th>
                <th scope="col">domicile</th>
                <th scope="col">cicatrice</th>
                <th scope="col">longueur</th>
                <th scope="col">Date de delivrance</th>
              </tr>
            </thead>
            <tbody>
              {contenuTab ? (
                currentItems.map((user, key) => (
                  <tr key={key}>
                    <th scope="row">{user.cin} </th>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>
                      {user.datenais} à {user.lieunais}
                    </td>
                    <td>{user.domicile}</td>
                    <td>{user.cicatrice}</td>
                    <td>{user.longueur} m</td>
                    <td>{user.dateLivrance}</td>
                    <td>
                      <Link
                      to={`detailsIndividu/${user.cin}`}
                        type="button"
                        className="btn btn-outline-success btn-sm m-1 waves-effect"
                        variant="default"
                        name="numCompteEdit"
                      >
                        <BsEye />
                      </Link>

                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm m-1 waves-effect"
                        variant="default"
                        name="numCompteEdit"
                        onClick={() => showEditModal(user.cin)}
                      >
                        <BsPencilSquare />
                      </button>

                      <Button
                        type="button"
                        className="btn btn-outline-danger btn-sm m-1 waves-effect"
                        variant="default"
                        onClick={() => showDeleteModal(user.cin)}
                      >
                        <BsFillTrashFill />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td> La liste est vide .... </td>
                  <td></td>
                  <td></td>
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
                disabled={currentPage == pages[pages.length - 1] ? true : false}
                onClick={handleNextbtn}
              >
                Suivant
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
  //#endregion
}
