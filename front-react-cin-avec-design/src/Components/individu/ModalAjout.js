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
  //#region // MES VARIABLES
  const u_info = {
    u_token: localStorage.token,
    u_attribut: localStorage.u_attribut,
    u_numUtilisateur: localStorage.u_numUtilisateur,
  };
  const [inputs, setInputs] = useState([]);
  const [imageFaceFM, setImageFaceFM] = useState({
    file: [],
    filepreview: null,
  });
  const [imageDosFM, setImageDosFM] = useState({
    file: [],
    filepreview: null,
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    cin: "numéro CIN obligatoire",
    nom: "Nom obligatoire",
    prenom: "Prenom obligatoire",
    nomPere: "Nom du Pere obligatoire",
    nomMere: "Nom du Mere obligatoire",
    datenais: "Date de naissance obligatoire",
    lieunais: "Lieu de naissance obligatoire",
    domicile: "Adress du domicile obligatoire",
    longueur: "longueur de l'Individu obligatoire",
    imgFaceFM: "Image Face du Fiche Mere obligatoire",
    imgDosFM: "Image Dos du Fiche Mere obligatoire",
    idOrigine: "Origine obligatoire",
    idArrondissement: "Arrondissement obligatoire",
    idProfession: "Profession obligatoire",
    sexe: "sexualité obligatoire",
    numSeries: "Numéro de series obligatoire",
  });
  //#endregion

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
  
  const handleImageFaceFMChange = (event) => {
    setImageFaceFM({
      ...imageFaceFM,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleImageDosFMChange = (event) => {
    setImageDosFM({
      ...imageDosFM,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  //#endregion

  //#region // FUNCTION AJOUT NOUVEAU XXX
  if (
    u_info.u_attribut === "déléguer" ||
    u_info.u_attribut === "administrateur"
  ) {
    URL_BASE = `individu/`;
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
          // reset();
          // props.onHide();
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

  //#region // IMAGE PHOTO DE FICHE MERE --FACE-- DE L'INDIVIDU
  const addImageFaceFM = async () => {
    const formdata = new FormData();
    formdata.append("imgFaceFM", imageFaceFM.file);
    const cinImgFaceFM = inputs.cin;
    
    axios
      .put(URL_BASE+`imageFaceFM/`+`${cinImgFaceFM}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success) {
          toast.success("Image upload successfully");
        }
      });
  };
  //#endregion

  //#region // IMAGE PHOTO DE FICHE MERE --FACE-- DE L'INDIVIDU
  const addImageDosFM = async () => {
    const formdata = new FormData();
    formdata.append("imgDosFM", imageDosFM.file);
    const cinImgDosFM = inputs.cin;
    
    axios
      .put(URL_BASE+`imageDosFM/`+`${cinImgDosFM}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        if (res.data.success) {
          toast.success("Image upload successfully");
        }
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

    if (!inputs.numSeries) {
      inputs.numSeries = false;
      isValidate = false;
    } else {
      if (inputs.numSeries.toString().length < 4) {
        isValidate = false;
      } else if (inputs.numSeries.toString().length > 12) {
        isValidate = false;
      }
    }

    if (!inputs.cicatrice) {
      inputs.cicatrice = "Aucune";
    } else {
      if (inputs.cicatrice.toString().length < 6) {
        isValidate = false;
      } 
    }

    if (!inputs.longueur) {
      inputs.longueur = false;
      isValidate = false;
    } else {
      if (inputs.longueur < 0.5 || inputs.longueur > 2.80){
        isValidate =false;
      }
    }

    if (!inputs.etatCIN) {
      inputs.etatCIN = "PRIMA";
    }
    if (!inputs.idUtilisateur) {
      inputs.idUtilisateur = u_info.u_numUtilisateur;
    }
    if (!inputs.sexe) {
      inputs.sexe = false;
      isValidate = false;
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
    if (!inputs.datenais) {
      inputs.datenais = false;
      isValidate = false;
    }
    if (!inputs.lieunais) {
      inputs.lieunais = false;
      isValidate = false;
    }
    if (!inputs.domicile) {
      inputs.domicile = false;
      isValidate = false;
    }

    // if (!imageFaceFM.imgFaceFM) {
    //   imageFaceFM.imgFaceFM = false;
    //   isValidate = false;
    // }
    // if (!imageDosFM.imgDosFM) {
    //   imageDosFM.imgDosFM = false;
    //   isValidate = false;
    // }

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

    if (!inputs.cicatrice) {
      isValidate=true
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
      if (inputs.longueur < 0.5 || inputs.longueur > 2.8){
        setErreurs({
          longueur: true,
        });
        setMessages({
          longueur: "Longueur anormale !",
        });
      }
    }

    if (!inputs.sexe) {
      setErreurs({
        sexe: true,
      });
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
    if (!inputs.datenais) {
      setErreurs({
        datenais: true,
      });
    }
    if (!inputs.lieunais) {
      setErreurs({
        lieunais: true,
      });
    }
    if (!inputs.domicile) {
      setErreurs({
        domicile: true,
      });
    }

    // if (!imageFaceFM.imgFaceFM) {
    //   setErreurs({
    //     imgFaceFM: true,
    //   });
    // }
    // if (!imageDosFM.imgDosFM) {
    //   setErreurs({
    //     imgDosFM: true,
    //   });
    // }

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
      onSubmit();
      addImageFaceFM();
      addImageDosFM();
    } else {
      console.log("NON");
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
            <Row style={rowStyle}>
              <Col>
                <h3>{props.children}</h3>
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
              <Col col="md-8">
                <Form.Label>Etat du CIN</Form.Label>
                <Form.Select
                  name="etatCIN"
                  value={inputs.etatCIN}
                  onChange={handleChange}
                  autoComplete="off"
                >
                  <option value="PRIMA"> - PRIMA </option>
                  <option value="DUPLICATA USURE"> - DUPLICATA USURE </option>
                  <option value="DUPLICATA PERTE"> - DUPLICATA PERTE </option>
                </Form.Select>
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
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Row style={rowStyle}>
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
                <Col onChange={handleChange}>
                  <Row>
                    <span> Sexe :</span>
                  </Row>
                  <Row>
                    <Form.Label>
                      <Form.Check
                        type="radio"
                        name="sexe"
                        autoComplete="off"
                        inline="true"
                        value="Homme"
                      />
                      Homme
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Label>
                      <Form.Check
                        type="radio"
                        name="sexe"
                        autoComplete="off"
                        inline="true"
                        value="Femme"
                      />
                      Femme
                    </Form.Label>
                  </Row>
                  <small className="text-danger d-block">
                    {erreurs.sexe ? messages.sexe : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Nom ...."
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
                    autoComplete="off"
                    placeholder="Prenom ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.prenom ? messages.prenom : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Date de Naissance</Form.Label>
                  <Form.Control
                    type="date"
                    name="datenais"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="dd/mm/yyyy"
                    min="01/01/1000"
                    max="30/12/9999"
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.datenais ? messages.datenais : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Lieu de Naissance</Form.Label>
                  <Form.Control
                    type="text"
                    name="lieunais"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="lieu de naissance ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.lieunais ? messages.lieunais : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Domicile</Form.Label>
                  <Form.Control
                    type="text"
                    name="domicile"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="domicile..."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.domicile ? messages.domicile : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Longueur</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="3"
                    name="longueur"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="longueur ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.longueur ? messages.longueur : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Cicatrice</Form.Label>
                  <Form.Control
                    type="text"
                    name="cicatrice"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="cicatrice ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.cicatrice ? messages.cicatrice : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom du Pere</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomPere"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="nom du Pere"
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.nomPere ? messages.nomPere : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom du Mere</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomMere"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="nom du Mere ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.nomMere ? messages.nomMere : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Image Face de Fiche Mere</Form.Label>
                  <Form.Control
                    type="file"
                    name="imgFaceFM"
                    onChange={handleImageFaceFMChange}
                    autoComplete="off"
                    placeholder="image face ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.imgFaceFM ? messages.imgFaceFM : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Image Dos de Fiche Mere</Form.Label>
                  <Form.Control
                    type="file"
                    name="imgDosFM"
                    onChange={handleImageDosFMChange}
                    autoComplete="off"
                    placeholder="image dos ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.imgDosFM ? messages.imgDosFM : null}
                  </small>
                </Col>
              </Row>

              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>idArrondissement</Form.Label>
                  <Form.Control
                    type="text"
                    name="idArrondissement"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="idArrondissement  ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.idArrondissement
                      ? messages.idArrondissement
                      : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>idOrigine</Form.Label>
                  <Form.Control
                    type="text"
                    name="idOrigine"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="idOrigine ...."
                    inline="true"
                  />
                  <small className="text-danger d-block">
                    {erreurs.idOrigine ? messages.idOrigine : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>idProfession</Form.Label>
                  <Form.Control
                    type="text"
                    name="idProfession"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="idProfession ...."
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
