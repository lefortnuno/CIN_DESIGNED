import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SeConnecter from "./Components/utilisateurs/Login/SeConnecter";
import Inscription from "./Components/utilisateurs/Login/Inscription";
import Protected from "./Context/Protected";
import Deconnection from "./Context/Deconnection";
import PageNotFound from './Context/PageNotFound';
import Utilisateur from "./Components/utilisateurs/utilisateur";
import UtilisateurEdition from "./Components/utilisateurs/UEdition";
import Arrondissement from "./Components/arrondissement/arrondissement";
// import Origine from "./Components/origine/origine";
// import Profession from "./Components/profession/profession";
// import Procedure_cin from "./Components/procedure_cin/procedure_cin";
// import Individu from "./Components/individu/individu";
// import AjoutIndividu from "./Components/individu/AjoutIndividu";
// import DetailsIndividu from "./Components/individu/DetailsIndividu";
// import Chart from "./Context/Chart";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Deconnection Cmp={SeConnecter} />} />
          <Route path='/*' element={<PageNotFound />} />
          <Route path="inscription/" element={<Inscription />} />
          <Route path="utilisateur/inscription/" element={<Inscription />} />
          <Route
            path="utilisateur/"
            element={<Protected Cmp={Utilisateur} />}
          />
          <Route
            path="utilisateur/UEdition/:idUtilisateur"
            element={<Protected Cmp={UtilisateurEdition} />}
          />
          <Route
            path="arrondissement/"
            element={<Protected Cmp={Arrondissement} />}
          />
          {/* <Route path="origine/" element={<Protected Cmp={Origine} />} /> */}
          {/* <Route path="profession/" element={<Protected Cmp={Profession} />} /> */}
          {/* <Route
            path="procedure_cin/"
            element={<Protected Cmp={Procedure_cin} />}
          /> */}
          {/* <Route path="individu/" element={<Protected Cmp={Individu} />} /> */}
          {/* <Route
            path="ajoutIndividu/"
            element={<Protected Cmp={AjoutIndividu} />}
          /> */}
          {/* <Route
            path="individu/detailsIndividu/:cin"
            element={<Protected Cmp={DetailsIndividu} />}
          /> */}
          {/* <Route path="chartjs/" element={<Protected Cmp={Chart} />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
