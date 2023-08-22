import React from "react";

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
import { Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";

export const SiteForm = ({
  operation,
  setOperation,
  object,
  setObject,
  isProcess,
  setIsProcess,
  listOfObjects,
  setListOfObjects,
  records,
  setRecords,
}) => {
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
          setIsProcess(false);
        } else {
          // navigate(-1);
          setTimeout(() => {
            setListOfObjects([response.data, ...listOfObjects]);
            setRecords([response.data, ...records]);
            setObject({});
            setIsProcess(false);
            toast.success("Ajouté avec succès.");
          }, 1000);
        }
      })
      .finally(() => {
        //
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
          setIsProcess(false);
        } else {
          setTimeout(() => {
            // navigate(-1);
            let newSS = listOfObjects.filter((val) => {
              return val.id !== obj.id;
            });
            setListOfObjects(newSS);
            setRecords(newSS);
            toast.info("Supprimé avec succès.");
            setObject({});
            setIsProcess(false);
          }, 1000);
        }
      })
      .finally(() => {
        //
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
          setIsProcess(false);
        } else {
          setTimeout(() => {
            toast.info("Modifié avec succès.", {});
            const newList = listOfObjects.map((o) => {
              if (o.id === obj.id) {
                return {
                  ...o,
                  title: obj.title,
                  description: obj.description,
                };
              }
              return o;
            });
            setListOfObjects(newList);
            setRecords(newList);
            setObject(obj);
            setIsProcess(false);
          }, 1000);
        }
      })
      .finally(() => {
        //
      });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <Card className="mb-2 shadow-sm">
              <Card.Header className="p-2 d-flex justify-content-between">
                Actions
                <FontAwesomeIcon
                  icon={faX}
                  className="mx-2 btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setOperation("");
                  }}
                />
              </Card.Header>
              <Card.Body>
                {operation !== "" && operation !== "details" ? (
                  <>
                    <Form>
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
                          className="text-danger text-left "
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
                          className="text-danger text-left "
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
                  </>
                ) : (
                  <div className="alert alert-info mb-0">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    Zone de gestion d'ajout, modification et suppression.
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        }}
      </Formik>
    </>
  );
};
