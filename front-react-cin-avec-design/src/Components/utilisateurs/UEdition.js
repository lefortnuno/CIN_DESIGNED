import axios from "../../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";

import Header from "../../Context/Header";
import SideBar from "../../Context/SideBar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const URL_DE_BASE = `utilisateur/`;
let isValidate = false;
let i = 0;

export default function UtilisateurEdition() {
  //#region // MES VARIABLES
  const navigate = useNavigate();
  const { idUtilisateur } = useParams();
  const u_info = {
    u_token: localStorage.token,
    u_identification: localStorage.identification,
    u_attribut: localStorage.attribut,
    u_idUtilisateur: localStorage.idUtilisateur,
    u_etatUtilisateur: localStorage.etatUtilisateur,
  };
  const opts = {
    headers: {
      Authorization: u_info.u_token,
    },
  };
  const [inputs, setInputs] = useState({
    idUtilisateur: "",
    identification: "",
    mdp: "",
    attribut: "",
    etatUtilisateur: "",
    mdp_confirmation: "",
    nouveau_mdp: "",
    mdp_edit: false,
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    identification: "Identification obligatoire",
    messageErreur: "",
    mdp: "Mot de pass obligatoire",
    nouveau_mdp: "Mot de pass obligatoire",
    mdp_confirmation: "Mot de pass de confirmation obligatoire",
  });
  //#endregion

  //#region // RECUPERER UN UTILISATEUR
  // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(idUtilisateur);
    i = 1;
  }

  function getOneUser(idUtilisateur) {
    axios.get(URL_DE_BASE + `${idUtilisateur}`, opts).then(function (response) {
      let plus = {
        mdp_confirmation: "",
        nouveau_mdp: "",
        mdp_edit: false,
      };
      plus = Object.assign(response.data[0], plus);
      setInputs(plus);
    });
  }
  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    isValidate = true;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, messageErreur: false }));

    if (value.length === 0) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " obligatoire",
      }));
    } else if (value.length < 4) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop court",
      }));
    } else if (value.length > 9) {
      isValidate = false;
      setErreurs((values) => ({ ...values, [name]: true }));
      setMessages((values) => ({
        ...values,
        [name]: name + " trop long",
      }));
    } else {
      isValidate = true;
      setErreurs((values) => ({ ...values, [name]: false }));
      setMessages((values) => ({ ...values, [name]: "" }));
    }

    if (name === "mdp_confirmation") {
      if (inputs.nouveau_mdp !== value) {
        isValidate = false;
        setErreurs((values) => ({ ...values, mdp_confirmation: true }));
        setMessages((values) => ({
          ...values,
          mdp_confirmation: "Vos mot de pass ne correspondent pas !",
        }));
      } else {
        isValidate = true;
      }
    }

    if (name === "nouveau_mdp") {
      if (inputs.mdp_confirmation.toString().length !== 0) {
        if (inputs.mdp_confirmation !== value) {
          isValidate = false;
          setErreurs((values) => ({ ...values, mdp_confirmation: true }));
          setMessages((values) => ({
            ...values,
            mdp_confirmation: "Vos mot de pass ne correspondent pas !",
          }));
        } else {
          isValidate = true;
          setErreurs((values) => ({ ...values, mdp_confirmation: false }));
        }
      }
    }

    if (name === "mdp_edit" && !value) {
      setErreurs((values) => ({ ...values, mdp_confirmation: false }));
      setErreurs((values) => ({ ...values, nouveau_mdp: false }));
    }
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event, identifiant) => {
    event.preventDefault();
    isValidate = true;

    if (!inputs.mdp_edit) {
      //SI Modification MDP NON CHECKED alors ON ENLEVER SES INPUTS
      delete inputs.mdp_confirmation;
      delete inputs.nouveau_mdp;
    }

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      const eString = inputs[element].toString();

      if (eString.length === 0) {
        setErreurs((values) => ({ ...values, [element]: true }));
        isValidate = false;
      }
    });

    if (isValidate) {
      onSubmit(identifiant);
    }
  };
  //#endregion

  //#region //ENVOYER DONNER FORMULAIRE AU BACK-END
  const onSubmit = (event) => {
    let data = {
      identification: inputs.identification,
    };
    if (inputs.mdp_edit) {
      const dataPlus = {
        mdp: inputs.nouveau_mdp,
      };
      data = Object.assign(data, dataPlus);
    } else {
      const dataPlus = {
        mdp: inputs.mdp,
      };
      data = Object.assign(data, dataPlus);
    }
    console.log(data);
    axios
      .put(URL_DE_BASE + `${idUtilisateur}`, data, opts)
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Modificatoin Reussi.");
          onClose();
        } else {
          toast.error("Echec de la Modification!");
        }
      });
  };
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    navigate("./utilisateur/");
    i = 0;

    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      if (element === "mdp_edit") {
        inputs[element] = false;
      } else {
        setInputs((values) => ({ ...values, [element]: "" }));
        inputs[element] = "";
      }
      isValidate = false;
      setErreurs((values) => ({ ...values, [element]: false }));
    });
  }
  //#endregion

  return (
    <>
      <Header />
      <div className="body">
        <SideBar />

        <section className="section-1">
          <div className="headerContenu">
            <p onClick={onClose} className="nouveauCompte text-danger">
              Annuler
            </p>
          </div>
          <div className="middleContenu">
            <div className="titleSeConnecter">
              <p className="h4 mb-4 "> Modification </p>
            </div>
            <div className="erreurMessage">
              {erreurs.messageErreur ? (
                <p className="text-danger d-block">{messages.messageErreur}</p>
              ) : null}
            </div>
          </div>

          {!erreurs.messageErreur ? null : <br />}

          <div className="mainContenu">
            <div className="loginbox">
              <form>
                <p>
                  Identification
                  <small className="text-danger d-block">
                    {erreurs.identification ? messages.identification : null}
                  </small>
                </p>
                <input
                  type="text"
                  name="identification"
                  onChange={handleChange}
                  value={inputs.identification}
                  placeholder="Entrez votre identificaton"
                  autoFocus
                  autoComplete="off"
                />
                <p className="mdp_edit_style">
                  <span> Mot de pass </span>

                  <span>
                    <input
                      type="checkbox"
                      name="mdp_edit"
                      onChange={handleChange}
                      checked={inputs.mdp_edit}
                      autoComplete="off"
                    />
                  </span>
                  <small className="text-danger d-block">
                    {erreurs.mdp_edit ? messages.mdp_edit : null}
                  </small>
                  <small className="text-danger d-block">
                    {erreurs.mdp ? messages.mdp : null}
                  </small>
                </p>
                <input
                  type="password"
                  name="mdp"
                  onChange={handleChange}
                  value={inputs.mdp}
                  placeholder="Entrez votre mot de pass"
                  autoComplete="off"
                />
                {inputs.mdp_edit ? (
                  <>
                    <p>
                      Nouveau mot de pass
                      <small className="text-danger d-block">
                        {erreurs.nouveau_mdp ? messages.nouveau_mdp : null}
                      </small>
                    </p>
                    <input
                      type="password"
                      name="nouveau_mdp"
                      onChange={handleChange}
                      value={inputs.nouveau_mdp}
                      placeholder="Entrez votre nouveau mot de pass"
                      autoComplete="off"
                    />
                    <p>
                      Confirmer votre nouveau mot de pass
                      <small className="text-danger d-block">
                        {erreurs.mdp_confirmation
                          ? messages.mdp_confirmation
                          : null}
                      </small>
                    </p>
                    <input
                      type="password"
                      name="mdp_confirmation"
                      onChange={handleChange}
                      value={inputs.mdp_confirmation}
                      placeholder="Confirmez votre nouveau mot de pass"
                      autoComplete="off"
                    />
                  </>
                ) : null}
                <div
                  className="btnOnSubmit"
                  onClick={(e) => validation(e, inputs.idUtilisateur)}
                >
                  Sauvegarder
                </div>
                <br />
                <span className="bienvenu"> - Bienvenu sur e-CIN - </span>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
