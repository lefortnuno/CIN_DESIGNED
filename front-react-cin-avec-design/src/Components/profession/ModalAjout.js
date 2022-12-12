import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL_BASE = `profession/`;

export default function ModalAjout(props) {
  //#region // FONCTION DU BOUTTON ENREGISTRER
  const onSubmit = (data) => {
    axios.post(URL_BASE, data).then(function (response) {
      if (response.status === 200) {
        toast.success("Ajout Reussi.");
        reset();
        props.onHide();
      } else {
        toast.error("Echec de l'Ajout!");
      }
    });
  };
  //#endregion

  //#region // PRE-VALIDATION DE MON FORMULAIRE
  const validationSchema = Yup.object().shape({
    nomProfession: Yup.string()
      .required("Nom de Profession obligatoire")
      .min(5, "trop court!entrez au moins 5 caracteres"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      nomProfession: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;
  //#endregion

  //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
  function onClose() {
    props.onHide();
  }
  //#endregion

  //#region // RENDU HTML DU MODAL AJOUT
  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{props.children}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom Profession</Form.Label>
              <Form.Control
                type="text"
                name="nomProfession"
                {...register("nomProfession")}
                placeholder="Nom du Travail"
                autoComplete="off"
                autoFocus
              />
              <small className="text-danger d-block">
                {errors.nomProfession?.message}
              </small>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
