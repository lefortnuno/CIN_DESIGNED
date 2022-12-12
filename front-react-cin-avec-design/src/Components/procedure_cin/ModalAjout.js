import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let URL_BASE;

//#region

//#endregion

export default function ModalAjout(props) {
  const u_info = {
    u_token: localStorage.token,
    u_attribut: localStorage.u_attribut,
    u_numUtilisateur: localStorage.u_numUtilisateur,
  };
  const [inputs, setInputs] = useState([]);
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    etatCin: "Etat de la cin",
    approbation: "oui ou non",
    numSeries: " numero serie de la cin",
    observation: "remarque a propos de la cin",
    idUtilisateur: "",
    cin: "numéro CIN obligatoire",
    idtmpindividu: "",
  });

  //#region // IMAGE PHOTO DE PROFILE DES UTILISATEURS

  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, [name]: false }));
  };
  //#endregion

  //#region // FUNCTION AJOUT NOUVEAU XXX
  if (
    u_info.u_attribut === "déléguer" ||
    u_info.u_attribut === "administrateur"
  ) {
    URL_BASE = `procedure_cin/`;
  } else if (u_info.u_attribut === "utilisateur") {
    URL_BASE = `tmpindividu/`;
  } else {
    URL_BASE = `error404/`;
  }
  const onSubmit = (event) => {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios
      .post(URL_BASE, inputs, opts)
      .then(function (response) {
        if (response.status === 200 && response.data.sqlState === "23000") {
          toast.error(response.data.sqlMessage);
        } else if (response.status === 200 && response.data.success) {
          toast.success("Ajout Reussi.");
          reset();
          props.onHide();
        } else {
          toast.error("Echec de l'ajout!");
          // FONCTON DE REDIRECTION VERS LE FORMULAIRE AJOUT INDIVIDU
        }
      })
      .catch((e) => {
        if (e.response.status === 403) {
          toast.error("Vous n'etes pas autoriser a ajouter un utilisateur!");
        }
      })
      .finally(() => {
        // reset();
        // props.onHide();
      });
  };
  //#endregion

  //#region // SCHEMA VALIDATION FORMULAIRE -----
  const handleSubmit = () => {
    let isValidate = true;
    //#region // --- VALEUR PAR DEFAUT
    if (!inputs.cin) {
      inputs.cin = false;
      isValidate = false;
    } else {
      if (inputs.cin.toString().length < 12) {
        isValidate = false;
      } else if (inputs.cin.toString().length > 12) {
        isValidate = false;
      }
    }

    if (!inputs.etatCIN) {
      inputs.etatCIN = "DUPLICATA USURE";
    }
    if (!inputs.numSeries) {
      inputs.numSeries = false;
      isValidate = false;
    }
    if (!inputs.observation) {
      inputs.observation = "Aucune";
    }
    if (!inputs.idUtilisateur) {
      inputs.idUtilisateur = u_info.u_numUtilisateur;
    }
    //#endregion

    //#region //-------- PRE-VALIDATION
    if (!inputs.cin) {
      setErreurs({
        cin: true,
      });
    } else {
      if (inputs.cin.toString().length < 12) {
        setErreurs({
          cin: true,
        });
        setMessages({
          cin: "numero CIN trop court",
        });
      } else if (inputs.cin.toString().length > 12) {
        setErreurs({
          cin: true,
        });
        setMessages({
          cin: "numero CIN trop long ",
        });
      }
    }

    if (!inputs.etatCin) {
      setErreurs({
        etatCin: true,
      });
    }
    if (!inputs.numSeries) {
      setErreurs({
        numSeries: true,
      });
    } else {
      if (inputs.numSeries.toString().length < 6) {
        setErreurs({
          numSeries: true,
        });
        setMessages({
          numSeries: "numero de series trop court",
        });
      } else if (inputs.numSeries.toString().length > 12) {
        setErreurs({
          numSeries: true,
        });
        setMessages({
          numSeries: "numero de series trop long ",
        });
      }
    }
    //#endregion

    if (isValidate) {
      onSubmit();
    }
  };
  //#endregion

  //#region // CLOSE MODAL
  function reset() {
    setInputs([]);
  }
  function onClose() {
    props.onHide();
    reset();
  }
  //#endregion

  const rowStyle = {
    marginTop: "1rem",
  };

  //#region // RENU HTML
  return (
    <>
      <Modal
        size="md"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header>
            <Row>
              <Col col="md-8" ml="auto">
                <h5>Procedure d'un CIN</h5>
                <span> :-- {u_info.u_numUtilisateur} --: </span>
                <Form.Control
                  type="number"
                  name="idUtilisateur"
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Numéro compte utilisateur ...."
                  min="1"
                  disabled={true}
                  hidden={true}
                />
              </Col>
              <Col col="md-8"  ml="auto">
                <Form.Label>Etat du CIN</Form.Label>
                <Form.Select
                  name="etatCin"
                  onChange={handleChange}
                  autoComplete="off"
                  inline="true"
                >
                  <option value="PRIMA"> - PRIMA </option>
                  <option value="DUPLICATA USURE"> - DUPLICATA USURE </option>
                  <option value="DUPLICATA PERTE"> - DUPLICATA PERTE </option>
                </Form.Select>
              </Col>
            </Row>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Row>
                <Col col="md-8" ml="auto">
                  <Form.Label>Numéro CIN</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="cin"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Numéro CIN ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.cin ? messages.cin : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Numéro de Series</Form.Label>
                  <Form.Control
                    type="text"
                    name="numSeries"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Numéro de series ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.numSeries ? messages.numSeries : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="observation"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Une observation à ajouter ? exemple : ''Bien ....'' "
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.observation ? messages.observation : null}
                  </small>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Form>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Enregistré
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
