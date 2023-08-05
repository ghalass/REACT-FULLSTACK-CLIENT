//#region IMPORTS
import React, { useContext, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { AuthContext } from "../../helpers/AuthContext";
import { Card } from "react-bootstrap";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";
//#endregion

import { toast } from "react-toastify";
import { motion } from "framer-motion";
function SiteCreate() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  //#region FONCTIONS
  // useEffect(() => {
  //   // check if logged in, else redirect to login page
  //   if (!localStorage.getItem("accessToken")) {
  //     navigate("/auth");
  //   }
  // }, []);

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2).max(10).required(),
    description: Yup.string().max(255),
  });

  const onSubmit = (data) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/sites`,
        data
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          navigate(-1);
          toast.success("Ajouté avec succès.");
        }
      });
  };
  //#endregion
  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{
        delay: 0,
        duration: 0.5,
        type: "spring",
        // stiffness: 20,
      }}
    >
      <Card className="shadow-sm">
        <Card.Header className="p-2 d-flex justify-content-cen">
          <span>Ajouter un nouveau</span>
        </Card.Header>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => {
              return (
                <Form>
                  <motion.div
                    className="mt-2  "
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{
                      delay: 0,
                      duration: 0.5,
                      type: "spring",
                      // stiffness: 20,
                    }}
                  >
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
                  </motion.div>

                  <motion.div
                    className="mt-2  "
                    initial={{ x: "100vw" }}
                    animate={{ x: 0 }}
                    transition={{
                      delay: 0.25,
                      duration: 0.5,
                      type: "spring",
                      // stiffness: 20,
                    }}
                  >
                    <Field
                      className={
                        "form-control" +
                        (props.errors.description && props.touched.description
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
                  </motion.div>

                  <div className="mt-2  d-flex justify-content-end">
                    <motion.button
                      className="btn btn-sm btn-outline-primary "
                      type="submit"
                      initial={{ x: "100vw" }}
                      animate={{ x: 0 }}
                      transition={{
                        delay: 0.5,
                        duration: 0.5,
                        type: "spring",
                        // stiffness: 20,
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Créer
                    </motion.button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default SiteCreate;
