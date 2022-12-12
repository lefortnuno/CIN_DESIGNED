import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `individu/`;
let i = 0;

export default function ModalEdition(props) {
  //#region // MES VARIABLES
  const u_info = {
    u_token: localStorage.token,
    u_attribut: localStorage.u_attribut,
    u_numUtilisateur: localStorage.u_numUtilisateur,
  };
  const [inputs, setInputs] = useState({
    cin: "201012133456",
    nom: "RANDRIA",
    prenom: "Hasiniaina",
    nomPere: "RABE",
    nomMere: "RASOA",
    lieunais: "Tambohobe",
    datenais: "",
    domicile: "Ampitakely",
    cicatrice: "aucune",
    longueur: "",
    imgFaceFM: "",
    imgDosFM: "",
    idOrigine: "",
    idArrondissement: "",
    idProfession: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    cin: "Numero du CIN Obligatoire",
    nom: "nom de l'individu",
    prenom: "prenom de l'individu",
    nomPere: "nom du pere de l'individu",
    nomMere: "nom du mere de l'individu",
    lieunais: "lieu de naissance",
    datenais: "",
    domicile: "domicile de l'individu",
    cicatrice: "aucune",
    longueur: "longueur de l;individu",
    imgFaceFM: "image face du Fiche Mere",
    imgDosFM: "image dos du Fiche Mere ",
    idOrigine: "",
    idArrondissement: "",
    idProfession: "",
    etatCin: "etat de la cin",
    idUtilisateur: "",
    observation: "aucune",
    dateProcedure: "",
    approbation: "",
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
    if(!inputs.etatCin){
      inputs.etatCin = "Duplicata Usure"
    }
    if (!inputs.observation) {
      inputs.observation = "Aucune";
    }
    if (!inputs.imgFaceFM) {
      inputs.imgFaceFM = "Aucune";
    }
    if (!inputs.imgDosFM) {
      inputs.imgDosFM = "Aucune";
    }
    if (!inputs.cicatrice) {
      inputs.cicatrice = "Aucune";
    }

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

    if (!inputs.nom) {
      inputs.nom = false;
      isValidate = false;
    }
    if (!inputs.prenom) {
      inputs.prenom = false;
      isValidate = false;
    }
    if (!inputs.nomPere) {
      inputs.nomPere = false;
      isValidate = false;
    }
    if (!inputs.nomMere) {
      inputs.nomMere = false;
      isValidate = false;
    }
    if (!inputs.lieunais) {
      inputs.lieunais = false;
      isValidate = false;
    }
    if (!inputs.datenais) {
      inputs.datenais = false;
      isValidate = false;
    }
    if (!inputs.domicile) {
      inputs.domicile = false;
      isValidate = false;
    }
    if (!inputs.longueur) {
      inputs.longueur = false;
      isValidate = false;
    } else {
      if (inputs.longueur < 0.5 || inputs.longueur > 2.8) {
        isValidate = false;
      }
    }

    if (!inputs.dateLivrance) {
      inputs.dateLivrance = false;
      isValidate = false;
    }
    if (!inputs.idOrigine) {
      inputs.idOrigine = false;
      isValidate = false;
    }
    if (!inputs.idArrondissement) {
      inputs.idArrondissement = false;
      isValidate = false;
    }
    if (!inputs.idProfession) {
      inputs.idProfession = false;
      isValidate = false;
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

    if (!inputs.nom) {
      setErreurs({
        nom: true,
      });
    }
    if (!inputs.prenom) {
      setErreurs({
        prenom: true,
      });
    }
    if (!inputs.nomPere) {
      setErreurs({
        nomPere: true,
      });
    }
    if (!inputs.nomMere) {
      setErreurs({
        nomMere: true,
      });
    }
    if (!inputs.lieunais) {
      setErreurs({
        lieunais: true,
      });
    }
    if (!inputs.datenais) {
      setErreurs({
        datenais: true,
      });
    }
    if (!inputs.domicile) {
      setErreurs({
        domicile: true,
      });
    }
    if (!inputs.cicatrice) {
      isValidate = true;
    } else {
      if (inputs.cicatrice.toString().length < 4) {
        setErreurs({
          cicatrice: true,
        });
        setMessages({
          cicatrice: "Cicatrice non précise !",
        });
      }
    }

    if (!inputs.longueur) {
      setErreurs({
        longueur: true,
      });
    } else {
      if (inputs.longueur < 0.5 || inputs.longueur > 2.8) {
        setErreurs({
          longueur: true,
        });
        setMessages({
          longueur: "Longueur anormale !",
        });
      }
    }

    if (!inputs.dateLivrance) {
      setErreurs({
        dateLivrance: true,
      });
    }
    if (!inputs.idOrigine) {
      setErreurs({
        idOrigine: true,
      });
    }
    if (!inputs.idArrondissement) {
      setErreurs({
        idArrondissement: true,
      });
    }
    if (!inputs.idProfession) {
      setErreurs({
        idProfession: true,
      });
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
        size="lg"
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header>
            <Row>
              <Col col="md-8" ml="auto">
                <h5> Info Individu</h5>
                <span> :-- {u_info.u_numUtilisateur} --: </span>
                <Form.Control
                  type="number"
                  name="idUtilisateur"
                  onChange={handleChange}
                  value={inputs.idUtilisateur}
                  autoComplete="off"
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
                  <option value="Duplicata d'usure"> - Duplicata d'usure </option>
                  <option value="Duplicata de perte"> - Duplicata de perte </option>
                </Form.Select>
              </Col>
            </Row>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Row>
                <Col col="md-8" ml="auto">
                  <Form.Label>Numéro de CIN</Form.Label>
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
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    onChange={handleChange}
                    value={inputs.nom}
                    autoComplete="off"
                    placeholder="Nom de l'Individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.nom ? messages.nom : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control
                    type="text"
                    name="prenom"
                    onChange={handleChange}
                    value={inputs.prenom}
                    autoComplete="off"
                    placeholder="Prenom de l'individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.prenom ? messages.prenom : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Date de naissance</Form.Label>
                  <inputs 
                    type="date"
                    name="datenais"
                    onChange={handleChange}
                    value={inputs.datenais}
                    autoComplete="off"
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.datenais ? messages.datenais : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Lieu naissance</Form.Label>
                  <Form.Control
                    type="text"
                    name="lieunais"
                    onChange={handleChange}
                    value={inputs.lieunais}
                    autoComplete="off"
                    placeholder="Lieu de naissance de l'individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.lieunais ? messages.lieunais : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Adress domicile</Form.Label>
                  <Form.Control
                    type="text"
                    name="domicile"
                    onChange={handleChange}
                    value={inputs.domicile}
                    autoComplete="off"
                    placeholder="domicile de l'individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.domicile ? messages.domicile : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom du Père</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomPere"
                    onChange={handleChange}
                    value={inputs.nomPere}
                    autoComplete="off"
                    placeholder="Nom du Pere du l'individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.nomPere ? messages.nomPere : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom de la Mère</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomMere"
                    onChange={handleChange}
                    value={inputs.nomMere}
                    autoComplete="off"
                    placeholder="Nom du Mere de l'Individu...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.nomMere ? messages.nomMere : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>longueur</Form.Label>
                  <Form.Control
                    type="text"
                    name="longueur"
                    onChange={handleChange}
                    value={inputs.longueur}
                    autoComplete="off"
                    placeholder="longueur de l'individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.longueur ? messages.longueur : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>cicatrice</Form.Label>
                  <Form.Control
                    type="text"
                    name="cicatrice"
                    onChange={handleChange}
                    value={inputs.cicatrice}
                    autoComplete="off"
                    placeholder="cicatrice de l'individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.cicatrice ? messages.cicatrice : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Date de délivrance</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateLivrance"
                    onChange={handleChange}
                    value={inputs.dateLivrance}
                    autoComplete="off"
                    placeholder="Date de delivrance de CIN ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.dateLivrance ? messages.dateLivrance : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Fiche Mère de Face</Form.Label>
                  <Form.Control
                    type="text"
                    name="imgFaceFM"
                    onChange={handleChange}
                    value={inputs.imgFaceFM}
                    autoComplete="off"
                    placeholder="image face de fiche mere...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.imgFaceFM ? messages.imgFaceFM : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Fiche Mère de Dos</Form.Label>
                  <Form.Control
                    type="text"
                    name="imgDosFM"
                    onChange={handleChange}
                    value={inputs.imgDosFM}
                    autoComplete="off"
                    placeholder="image dos du fiche mere ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.imgDosFM ? messages.imgDosFM : null}
                  </small>
                </Col>
              </Row>


              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Arrondissement </Form.Label>
                  <Form.Control
                    type="text"
                    name="idArrondissement"
                    onChange={handleChange}
                    value={inputs.idArrondissement}
                    autoComplete="off"
                    placeholder="Arrodissement de délivrance du CIN ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.idArrondissement ? messages.idArrondissement : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Origine</Form.Label>
                  <Form.Control
                    type="text"
                    name="idOrigine"
                    onChange={handleChange}
                    value={inputs.idOrigine}
                    autoComplete="off"
                    placeholder="Origine de l'individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.idOrigine ? messages.idOrigine : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    type="text"
                    name="idProfession"
                    onChange={handleChange}
                    value={inputs.idProfession}
                    autoComplete="off"
                    placeholder="Profession de l'individu ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.idProfession ? messages.idProfession : null}
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
            onClick={(e) => handleSubmitEdit(e, inputs.cin)}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
