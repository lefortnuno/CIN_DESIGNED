import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5005/api/utilisateur/seConnecter`, inputs)
      .then(function (response) {
        if (response.data.success) {
          navigate("/user/");
          toast.success(`Co Reussi`);
        } else {
          toast.warn(`Co Reussi`);
        }
      });
  };
  return (
    <>
      <div className="container">
        <Form className="text-center border border-light p-5">
          <p class="h4 mb-4"> Se Connecter </p>
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
          <Button
            variant="danger"
            type="reset"
          >
            Annuler
          </Button>
          <span> </span>
          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            Se Connecter
          </Button>
        </Form>
      </div>
    </>
  );
}
