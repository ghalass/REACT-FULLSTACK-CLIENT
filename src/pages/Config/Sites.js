import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { motion } from "framer-motion";
import * as Yup from "yup";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faList,
  faInfoCircle,
  faTrashCan,
  faPenNib,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";

const containerVariant = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0,
      duration: 0.5,
      type: "spring",
      when: "beforeChildren",
    },
  },
};

const searchDivVariant = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: "spring",
    },
  },
};

const searchDivButtonVariant = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.25,
      duration: 0.5,
      type: "spring",
    },
  },
};

const tableVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0,
      duration: 0.75,
      type: "spring",
      stiffness: 200,
    },
  },
  hover: {
    scale: 1.3,
    color: "#eee",
    originX: 0,
    // textShadow: "0px 0px 8px rgb(255,255,255)",
    // boxShadow: "0px 0px 8px rgb(255,255,255)",
  },
};

function Sites() {
  const [listOfObjects, setListOfObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcess, setIsProcess] = useState(false);

  const [operation, setOperation] = useState("");
  const [object, setObject] = useState({});
  useEffect(() => {
    // setIsLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/sites`).then((response) => {
      setIsLoading(false);
      if (!response.data.error) {
        setListOfObjects(response.data);
      } else {
        alert(response.data.error);
      }
    });
  }, []);

  const initialValues = {
    id: object?.id || "",
    title: object?.title || "",
    description: object?.description || "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2).max(64).required(),
    description: Yup.string().max(255),
  });

  const onSubmit = (data) => {
    switch (operation) {
      case "add":
        addObject(data);
        break;
      case "delete":
        deleteObject(data);
        break;
      case "update":
        updateObject(data);
        break;
      default:
        break;
    }
  };

  const addObject = (obj) => {
    setIsProcess(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/sites`,
        obj
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          // navigate(-1);
          toast.success("Ajouté avec succès.");
          setListOfObjects([response.data, ...listOfObjects]);
          setObject({});
        }
        setIsProcess(false);
        setObject({});
      });
  };
  const deleteObject = (obj) => {
    setIsProcess(true);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/sites/${obj.id}`
        // , {
        // headers: {
        //   accessToken: localStorage.getItem("accessToken"),
        // },
        // }
      )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          // navigate(-1);
          setListOfObjects(
            listOfObjects.filter((val) => {
              return val.id !== obj.id;
            })
          );
          toast.info("Supprimé avec succès.");
          setObject({});
        }
        setIsProcess(false);
      });
  };
  const updateObject = (obj) => {
    setIsProcess(true);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/sites`,
        obj
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error, {});
        } else {
          toast.info("Modifié avec succès.", {});
        }
        setIsProcess(false);
      });
  };

  return (
    <div className="">
      <div className="text-left m-2 p-2">
        <div className="row">
          <div className={"pr-1 col"}>
            {/* <Outlet /> */}

            {/* CARD LIST */}
            <Card className="mb-2 shadow-sm">
              <Card.Header className="p-2 d-flex justify-content-between">
                Liste
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mx-2 text-primary btn btn-sm"
                  onClick={() => {
                    setOperation("add");
                    setObject({});
                  }}
                />
              </Card.Header>
              <Card.Body>
                {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="grow" variant="info" />
                    <span className="mt-1 ml-2">Loading ...</span>
                  </div>
                ) : (
                  <ListGroup variant="flush" className="">
                    {!listOfObjects.length ? (
                      <div className="alert alert-info">
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="mx-2 "
                        />
                        Aucun enregistrement n'est trouvé !{" "}
                      </div>
                    ) : (
                      listOfObjects.map((objectOfList, key) => {
                        const len = listOfObjects.length;
                        const totalTime = 2; //second
                        const step = len !== 0 ? totalTime / len : 0;
                        let itemDelay = step * key;
                        return (
                          <ListGroup.Item key={key}>
                            <motion.div
                              className="row d-flex justify-content-between"
                              initial={{ x: "-100vw" }}
                              transition={{ duration: itemDelay }}
                              animate={{ x: 0 }}
                            >
                              <motion.div
                                className="col-8 "
                                variants={tableVariant}
                                animate="visible"
                                whileHover="hover"
                              >
                                <span
                                  className="text-uppercase btn btn-sm"
                                  onClick={() => {
                                    setOperation("details");
                                    setObject({});
                                  }}
                                >
                                  {objectOfList.title}
                                </span>
                              </motion.div>

                              <div className="col-4 d-flex  justify-content-around border-left">
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="mx-2 text-danger btn btn-sm"
                                  onClick={() => {
                                    setOperation("delete");
                                    setObject(objectOfList);
                                  }}
                                />

                                <FontAwesomeIcon
                                  icon={faPenNib}
                                  className="mx-2 btn btn-sm"
                                  onClick={() => {
                                    setOperation("update");
                                    setObject(objectOfList);
                                  }}
                                />
                              </div>
                            </motion.div>
                          </ListGroup.Item>
                        );
                      })
                    )}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </div>

          <div className={"pr-1 col"}>
            {/* CARD CRUD */}
            <Card className="mb-2 shadow-sm">
              <Card.Header className="p-2 d-flex justify-content-between">
                CRUD : {operation}
                <FontAwesomeIcon
                  icon={faX}
                  className="mx-2 text-primary btn btn-sm"
                  onClick={() => {
                    setOperation("");
                  }}
                />
              </Card.Header>
              <Card.Body>
                {/* check operation type */}
                {operation !== "" && operation !== "details" ? (
                  <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {(props) => {
                      return (
                        <Form>
                          <div className="mt-2  ">
                            <Field
                              hidden
                              className={
                                "form-control" +
                                (props.errors.id && props.touched.id
                                  ? " is-invalid"
                                  : "")
                              }
                              id="id"
                              name="id"
                              placeholder="Id du site"
                              autoComplete="off"
                            />

                            <ErrorMessage
                              name="id"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="mt-2  ">
                            <Field
                              className={
                                "form-control" +
                                (props.errors.title && props.touched.title
                                  ? " is-invalid"
                                  : "")
                              }
                              id="title"
                              name="title"
                              placeholder="Nom du site"
                              autoComplete="off"
                            />

                            <ErrorMessage
                              name="title"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="mt-2  ">
                            <Field
                              className={
                                "form-control" +
                                (props.errors.description &&
                                props.touched.description
                                  ? " is-invalid"
                                  : "")
                              }
                              id="description"
                              name="description"
                              placeholder="Description du site"
                              autoComplete="off"
                              as="textarea"
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>

                          <div className="mt-2  d-flex justify-content-end">
                            <button
                              className={
                                "btn btn-sm " +
                                (operation === "update"
                                  ? " btn-outline-success "
                                  : operation === "delete"
                                  ? " btn-outline-danger "
                                  : operation === "add"
                                  ? " btn-outline-primary "
                                  : "")
                              }
                              type="submit"
                              disabled={isProcess ? true : false}
                            >
                              {isProcess ? (
                                <>
                                  <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                  />
                                  Traitement...
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon
                                    icon={
                                      operation === "update"
                                        ? faPenNib
                                        : operation === "delete"
                                        ? faTrashCan
                                        : operation === "add"
                                        ? faPlus
                                        : ""
                                    }
                                    className="mr-2"
                                  />
                                  {operation === "update"
                                    ? "Modifier"
                                    : operation === "delete"
                                    ? "Supprimer"
                                    : operation === "add"
                                    ? "Ajouter"
                                    : ""}
                                </>
                              )}
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                ) : (
                  <div className="alert alert-info mb-0">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    Zone de gestion d'ajout, modification et suppression.
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* CARD DETAILS */}
            <Card className="mb-2 shadow-sm">
              <Card.Header className="p-2 d-flex justify-content-between">
                DETAILS
              </Card.Header>
              <Card.Body>
                {/* check operation type */}
                {operation === "details" ? (
                  "details"
                ) : (
                  <div className="alert alert-info mb-0">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    Zone de gestion des détails.
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sites;
