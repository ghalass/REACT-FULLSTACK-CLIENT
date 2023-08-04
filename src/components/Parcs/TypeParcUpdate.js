import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Card } from "react-bootstrap";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function TypeParcUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2).max(64).required(),
  });

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  // });

  const onSubmit = (data) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/typeparcs`,
        { id: id, title: data.title }
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate(-1);
        }
      });
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="p-2 d-flex justify-content-cen">
        <span>Modification</span>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {function Render({ errors, touched, isSubmitting, setFieldValue }) {
            const [_title, _setTitle] = useState("");

            useEffect(() => {
              // check if logged in, else redirect to login page
              // if (!localStorage.getItem("accessToken")) {
              //   Navigate("/auth");
              // } else {
              axios
                .get(
                  `${process.env.REACT_APP_BASE_URL}/typeparcs/byId/${id}`
                  // , {
                  // headers: { accessToken: localStorage.getItem("accessToken") },
                  // }
                )
                .then((response) => {
                  if (response.data.error) {
                    alert(response.data.error);
                  } else {
                    setFieldValue("title", response.data.title, true);
                  }
                });
              // }
            }, []);
            return (
              <Form>
                <div className="mt-2  ">
                  <Field
                    className={
                      "form-control" +
                      (errors.title && touched.title ? " is-invalid" : "")
                    }
                    id="title"
                    name="title"
                    placeholder="Nom du typeparc"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mt-2  d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-outline-primary "
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Modifier
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Card.Body>
    </Card>
  );
}

export default TypeParcUpdate;
