import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `procedure_cin/`;
let i = 0;

export default function ModalEdition(props) {
  //#region // MES VARIABLES
  const u_info = {
    u_token: localStorage.token,
    u_attribut: localStorage.u_attribut,
    u_numUtilisateur: localStorage.u_numUtilisateur,
  };
  const [inputs, setInputs] = useState({
    etatCin: "DUPLICATA USURE",
    numSeries: "123499/B",
    observation: "Modification!",
    cin: "201011000000",
    dateProcedure:""
  });
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

  const id = props.children;
  //#endregion

  //#region // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.showEdit && i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(id);
    i = 1;
  }
  //#endregion

  //#region // RECUPERER UN Procedure_cin
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
    }
  };
  //#endregion

  //#region // FUNC BOUTTON CLOSE
  function onClose() {
    props.onHide();
    i = 0;
  }
  const rowStyle = {
    marginTop: "1rem",
  };
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
              <Col col="md-8" ml="auto">
                <Form.Label>Etat du CIN</Form.Label>
                <Form.Select
                  name="etatCin"
                  onChange={handleChange}
                  value={inputs.etatCin}
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
                    value={inputs.cin}
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
                    value={inputs.numSeries}
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
                    value={inputs.observation}
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

          <Button
            variant="primary"
            onClick={(e) => handleSubmitEdit(e, inputs.idProcedureCin)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
