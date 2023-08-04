import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Card } from "react-bootstrap";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ParcCreate() {
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
          console.log(response.data);
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

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/parcs`, data)
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
        <span>Ajouter un nouveau</span>
      </Card.Header>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="mt-2  ">
              <Field
                className="form-control "
                id="title"
                name="title"
                placeholder="Nom du typeparc (Ex : Roulage, Terrassement, ...)"
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
                placeholder="Description du typeparc"
                autoComplete="off"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger text-left "
              />
            </div>

            <div className="mt-2  d-flex justify-content-end">
              <button className="btn btn-sm btn-outline-primary " type="submit">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Créer
              </button>
            </div>
          </Form>
        </Formik>
      </Card.Body>
    </Card>
  );
}

export default ParcCreate;
