import axios from "../../api/axios";
import Header from "../../context/header";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

let BASE_URL;

export default function AjoutIndividu() {
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

  //#region // RENDU HTML ----
  return (
    <>
      <div>
        <Header />
        <h1> Ajout Nouveau Individu </h1>
      </div>
    </>
  );
  //#endregion
}
