import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function ListUser() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  const [showEdit, setShowEdit] = useState(false);

  const [inputs, setInputs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5005/api/utilisateur/", inputs)
      .then(function (response) {
        getUsers();
        handleClose();
      });
  };

  const handleSubmitEdit = (event, id) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .put(`http://localhost:5005/api/utilisateur/${id}`, inputs)
      .then(function (response) {
        getUsers();
        handleCloseEdit();
      });
  };

  function getUsers() {
    axios
      .get("http://localhost:5005/api/utilisateur/")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }

  function getOneUsers(id) {
    axios
      .get(`http://localhost:5005/api/utilisateur/${id}`)
      .then(function (response) {
        handleShowEdit();
        setInputs(response.data[0]);
        console.log(response.data[0]);
      });
  }
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5005/api/utilisateur/${id}`)
      .then(function (response) {
        getUsers();
        toast.success(`Suppr Reussi`);
      });
  };
  return (
    <>
      <div>
        <h2>
          List Utilisateurs

          <span> </span>
          <Button
            className="btn btn-sm btn-primary"
            variant="primary"
            onClick={handleShow}
          >
            Ajout Utilisateur
          </Button>
      
          <span> </span>
          <label>
          <input type={"search"} className="form-control form-control-sm" />
          </label>

        </h2>

        <div className="table-responsive text-nowrap">
          <table className="table table-striped w-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Heading</th>
                <th scope="col">Heading</th>
                <th scope="col">Heading</th>
                <th scope="col">Heading</th>
                <th scope="col">Heading</th>
                <th scope="col">Heading</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <tr key={key}>
                  <th scope="row">{user.NumCompte} </th>
                  <td>{user.cin}</td>
                  <td>{user.identification}</td>
                  <td>{user.attribut}</td>
                  <td>{user.mdp}</td>
                  <td>{user.etatCompte}</td>
                  <td className="mr-4">
                    <button
                      type="button" 
                      className="btn btn-outline-primary btn-sm m-0 waves-effect"
                      variant="primary"
                      onClick={() => getOneUsers(user.NumCompte)}
                    >
                      <i className="fas fa-edit mr-2 grey-text" aria-hidden="true"></i>
                      EDIT
                    </button>
                    <span> </span>
                    <Button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(user.NumCompte)}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type="text"
                name="cin"
                onChange={handleChange}
                placeholder="Numero CIN"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Mdp</Form.Label>
              <Form.Control
                type="password"
                name="mdp"
                onChange={handleChange}
                placeholder="mot de pass"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type="text"
                name="cin"
                value={inputs.cin}
                onChange={handleChange}
                placeholder="Numero CIN"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>identification</Form.Label>
              <Form.Control
                type="text"
                name="identification"
                value={inputs.identification}
                onChange={handleChange}
                placeholder="identificaton"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>attribut</Form.Label>
              <Form.Control
                type="text"
                name="attribut"
                value={inputs.attribut}
                onChange={handleChange}
                placeholder="attribut"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>etatCompte</Form.Label>
              <Form.Control
                type="text"
                name="etatCompte"
                value={inputs.etatCompte}
                onChange={handleChange}
                placeholder="attribut"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Mdp</Form.Label>
              <Form.Control
                type="password"
                name="mdp"
                value={inputs.mdp}
                onChange={handleChange}
                placeholder="mot de pass"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={(e) => handleSubmitEdit(e, inputs.NumCompte)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
