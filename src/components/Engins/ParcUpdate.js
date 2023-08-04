import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Card } from "react-bootstrap";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ParcUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [typeparcs, setTypeparcs] = useState([]);

  useEffect(() => {
    // check if logged in, else redirect to login page
    // if (!localStorage.getItem("accessToken")) {
    //   Navigate("/auth");
    // } else {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/typeparcs`
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setTypeparcs(response.data);
        }
      });
    // }
  }, []);

  const initialValues = {
    title: "",
    description: "",
    TypeParcId: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2).max(45).required(),
    description: Yup.string().min(2).max(45).required(),
    TypeParcId: Yup.string().required(),
  });

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  // });

  const onSubmit = (data) => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/parcs`,
        { id: id, title: data.title, TypeParcId: data.TypeParcId }
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
            const [_description, _setDescription] = useState("");
            const [_TypeParcId, _setTypeParcId] = useState("");

            useEffect(() => {
              // check if logged in, else redirect to login page
              // if (!localStorage.getItem("accessToken")) {
              //   Navigate("/auth");
              // } else {
              axios
                .get(
                  `${process.env.REACT_APP_BASE_URL}/parcs/byId/${id}`
                  // , {
                  // headers: { accessToken: localStorage.getItem("accessToken") },
                  // }
                )
                .then((response) => {
                  if (response.data.error) {
                    alert(response.data.error);
                  } else {
                    setFieldValue("title", response.data.title, true);
                    setFieldValue(
                      "description",
                      response.data.description,
                      true
                    );
                    setFieldValue(
                      "TypeParcId",
                      response.data.TypeParc.id,
                      true
                    );
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

                <div className="mt-2  ">
                  <Field
                    className="form-control text-uppercase"
                    id="TypeParcId"
                    name="TypeParcId"
                    placeholder="Nom du typeparc (Ex : Roulage, Terrassement, ...)"
                    autoComplete="off"
                    as="select"
                  >
                    <option value="">---- Choisir un type de parc</option>
                    {typeparcs.map((typeparc, key) => {
                      return (
                        <option key={key} value={typeparc.id}>
                          {typeparc.title}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="TypeParcId"
                    component="div"
                    className="text-danger text-left "
                  />
                </div>

                <div className="mt-2  ">
                  <Field
                    className="form-control "
                    id="description"
                    name="description"
                    placeholder="Description du parc"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger text-left "
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

export default ParcUpdate;
