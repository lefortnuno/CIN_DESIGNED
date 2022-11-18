import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login() {
  const navigate = useNavigate();

  {
    /* SFONCTION A EXECUTER LORS DU CLIC ' SE-CONNECTER ' ----- () => SE CONNECTER ----- */
  }
  
  const [inputs, setInputs] = useState([]);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5010/api/utilisateur/seConnecter`, inputs)
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          navigate("/utilisateur/");
          toast.success(`Co Reussi`);
          setUserToken(response.data.token)
          setUserData(response.data.user)

          console.log("token  = ", JSON.stringify(userToken));
          console.log("utilisateur  = ", JSON.stringify(userData));
        } else {
          toast.error(`Co echec`);
        }
      });
  };


  {
    /* RENDU HTML ----- JSX ----- */
  }
  return (
    <>
      <div className="container">
        <Form className="text-center border border-light p-5">
          <p className="h4 mb-4">Se Connecter</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label> </Form.Label>
            <Form.Control
              type="text"
              name="identification"
              onChange={handleChange}
              placeholder="identification"
              className="form-control mb-4"
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label> </Form.Label>
            <Form.Control
              type="password"
              name="mdp"
              onChange={handleChange}
              placeholder="mot de pass"
              className="form-control mb-4"
            />
          </Form.Group>
          <Button variant="danger" type="reset">
            Annuler
          </Button>
          <span> </span>
          <Button variant="primary" onClick={onSubmit}>
            Se Connecter
          </Button>
        </Form>
      </div>
    </>
  );
}
