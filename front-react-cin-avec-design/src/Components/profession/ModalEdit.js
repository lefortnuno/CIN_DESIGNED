import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL_BASE = `profession/`;
let i = 0;

export default function ModalEdition(props) {
  const [inputs, setInputs] = useState({
    nomProfession : "Etudiante"
  });
  const id = props.children;

  //#region // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.showEdit && i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(id);
    i = 1;
  }
  //#endregion

  //#region // PRE-ACTUALISATION
  useEffect(() => {
    getOneUser(id);
  }, []);
  //#endregion

  //#region // RECUPERER UN Profession
  function getOneUser(id) {
    axios.get(URL_BASE + `${id}`).then(function (response) {
      setInputs(response.data[0]);
    });
  }
  //#endregion

  //#region // CHANGER OU CHARGER LES CONTENUS DES INPUTS
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //#endregion

  //#region // FUNC BOUTTON SAUVEGARDER LES MODIFICATIONS
  const handleSubmitEdit = (event, id) => {
    event.preventDefault();
    axios.put(URL_BASE + `${id}`, inputs).then(function (response) {
      if (response.status === 200) {
        toast.success("Modificatoin Reussi.");
        i = 0;
        props.onHide();
      } else {
        toast.error("Echec de la Modification!");
      }
    });
  };
  //#endregion

  //#region // FUNC BOUTTON CLOSE
  function onClose() {
    props.onHide();
    i = 0;
  }
  //#endregion

  //#region // RENDU HTML MODAL EDITER
  return (
    <>
      <Modal
        size="sm"
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Edition Profession Numero : {id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Nom de l'Profession</Form.Label>
              <Form.Control
                type="text"
                name="nomProfession"
                value={inputs.nomProfession}
                onChange={handleChange}
                placeholder="nomProfession"
                autoComplete="off"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button
            variant="primary"
            onClick={(e) => handleSubmitEdit(e, inputs.idProfession)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
