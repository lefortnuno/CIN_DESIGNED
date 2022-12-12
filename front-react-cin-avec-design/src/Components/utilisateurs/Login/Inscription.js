import axios from "../../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import Header from "../../../Context/Header";
import SideBar from "../../../Context/SideBar";

const URL_DE_BASE = `utilisateur/seConnecter`;
let isValidate = false;

export default function Inscription() {
  const navigate = useNavigate();
  const u_info = {
    u_token: localStorage.token,
    u_identification: localStorage.identification,
    u_attribut: localStorage.attribut,
    u_idUtilisateur: localStorage.idUtilisateur,
    u_etatUtilisateur: localStorage.etatUtilisateur,
  };
  const [inputs, setInputs] = useState({
    identification: "",
    mdp: "",
    mdp_confirmation: "",
  });
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    identification: "Identification obligatoire",
    messageErreur: "",
    mdp: "Mot de pass obligatoire",
    mdp_confirmation: "Mot de pass de confirmation obligatoire",
  });

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
      if (inputs.mdp !== value) {
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

    if (name === "mdp") {
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
  };
  //#endregion

  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();

    const inputsArray = Object.keys(inputs);
    inputsArray.forEach((element) => {
      const value = Object.values(inputs[element]);
      if (value.length === 0) {
        setErreurs((values) => ({ ...values, [element]: true }));
        isValidate = false;
      }
    });

    if (isValidate) {
      //   onSubmit();
      toast.success("Reussi", isValidate);
    }
  };
  //#endregion

  //#region //ENVOYER DONNER FORMULAIRE AU BACK-END
  const onSubmit = (event) => {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios
      .post(URL_DE_BASE, inputs, opts)
      .then(function (response) {
        if (response.data.success && response.status === 200) {
          navigate("/utilisateur/");
          toast.success(`Connection Reussi`);
          const utilisateur = response.data.user[0];
          localStorage.setItem("token", response.data.token);
          for (const u in utilisateur) {
            localStorage.setItem(u, utilisateur[u]);
          }
        } else {
          setErreurs((values) => ({ ...values, messageErreur: true }));
          setMessages((values) => ({
            ...values,
            messageErreur: "Identification ou Mot de pass Incorrect !",
          }));
        }
      })
      .catch((error) => {
        setErreurs((values) => ({ ...values, messageErreur: true }));
        setMessages((values) => ({
          ...values,
          messageErreur:
            "Veuillez vous connecter au serveur! Il y a eu une erreur de connection : " +
            error,
        }));
      });
  };
  //#endregion

  return (
    <>
      <Header />
      <div className="body">
        <SideBar />

        <section className="section-1">
          <div className="headerContenu">
            <Link to={`/`} className="nouveauCompte">
              S'authentifier
            </Link>
          </div>
          <div className="middleContenu">
            <div className="titleSeConnecter">
              <p className="h4 mb-4">S'enregistrer </p>
            </div>
            <div className="erreurMessage">
              {erreurs.messageErreur ? (
                <p className="text-danger d-block">{messages.messageErreur}</p>
              ) : null}
            </div>
          </div>

          {!erreurs.messageErreur ? null : <br />}

          <div className="mainContenu">
            <div className="logoFANJAKANA">
              <img src={process.env.PUBLIC_URL + `/picture/fanjakana.jpg`} />
            </div>
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
                  placeholder="Entrez votre identificaton"
                  autoFocus
                  autoComplete="off"
                  id="loginUser"
                />
                <p>
                  Mot de pass
                  <small className="text-danger d-block">
                    {erreurs.mdp ? messages.mdp : null}
                  </small>
                </p>
                <input
                  type="password"
                  name="mdp"
                  onChange={handleChange}
                  placeholder="Entrez votre mot de pass"
                  autoComplete="off"
                  id="loginPassword"
                />
                <p>
                  Confirmer votre mot de pass
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
                  placeholder="Confirmez votre mot de pass"
                  autoComplete="off"
                  id="loginPasswordConfirm"
                />
                <div className="btnOnSubmit" onClick={validation}>
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
