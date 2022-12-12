import axios from "../../api/axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print"

const URL_BASE = `individu/`;
const idCIN = "20101128460";

export default function Individu() {
  const { cin } = useParams();
  console.log(cin);
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
  const [inputs, setInputs] = useState([]);

  const compRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => compRef.current,
    documentTitle: "Zavatra imprimer-na!",
    onAfterPrint: () => alert("Print Reussi.")
  })

  useEffect(() => {
    getOneUser();
  }, []);

  //#region // RECUPERER UN INDIVIDU
  function getOneUser() {
    console.log("cin : ", idCIN);
    axios.get(URL_BASE + `${idCIN}`).then(function (response) {
      setInputs(response.data[0]);
      console.log("response : ", response);
    });
  }
  //#endregion

  //#region // RENDU HTML ----
  return (
    <>
      <h1> DETAILS INDIVIDU</h1>
      {inputs ? (
        <>
        <button onClick={handlePrint}> Print </button>
        <div ref={compRef} >
          <p>
            cin : {inputs.cin} - nom : {inputs.nom} - prenom : {inputs.prenom} -
            datenais : {inputs.datenais} - lieunais : {inputs.lieunais}{" "}
          </p>
          <p>
            image fiche mere de devant :
            <img
              src={
                process.env.PUBLIC_URL + `/picture-devant/${inputs.imgFaceFM}`
              }
              style={{ width: "150px", height: "150px" }}
            />
          </p>
          <p>
            image fiche mere de derriere :
            <img
              src={process.env.PUBLIC_URL + `/picture-devant/${inputs.imgDosFM}`}
              style={{ width: "150px", height: "150px" }}
            />
          </p>
        </div></>
      ) : (
        <>
        <button onClick={handlePrint}> Print </button>
        <div ref={compRef}  style={{width: "100%"}}>
          <p> IL N'Y A PAS DE CIN !</p>
          <p>
            image FACE :
            <img
              src={process.env.PUBLIC_URL + "/picture-devant/fiche-mere/1670505562539-DSC_0101.jpg"}
              style={{ width: "150px", height: "150px" }}
            />
          </p>
          <p>
            image DOS :
            <img
              src={process.env.PUBLIC_URL + "/picture-arriere/fiche-mere/1670505562566-a60f95e6048a6076bc6ca88177633fab.jpg"}
              style={{ width: "150px", height: "150px" }}
            />
          </p>
        </div>
        </>
      )}
    </>
  );
  //#endregion
}
