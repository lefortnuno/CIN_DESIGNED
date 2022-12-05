import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Utilisateur from "./utilisateurs/u";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={ <Utilisateur />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
