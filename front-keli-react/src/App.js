import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import ListUser from './components/ListUser';
import ListDossier from './components/ListDossier';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Deconnection</Link>
            </li>
            <li>
              <Link to="/user/">List Utilisateur</Link>
              <span> </span>
              <Link to="/dossier/">List Dossier</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<Login />} />
          <Route path="user/" element={<ListUser />} />
          <Route path="dossier/" element={<ListDossier />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
