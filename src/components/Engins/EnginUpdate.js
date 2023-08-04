import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { Card } from "react-bootstrap";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function EnginUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [typeparcs, setTypeparcs] = useState([]);
  const [parcs, setParcs] = useState([]);
  const [sites, setSites] = useState([]);

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

    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/sites`
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setSites(response.data);
        }
      });
  }, []);

  const initialValues = {
    title: "",
    description: "",
    ParcId: "",
    SiteId: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2).max(45).required(),
    description: Yup.string().min(2).max(45).required(),
    ParcId: Yup.string().required(),
    SiteId: Yup.string().required(),
  });

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  // });

  const onSubmit = (data) => {
    // enlever TypeParcId de l'objet
    const { TypeParcId, ...restOfData } = data;
    restOfData.id = id;
    console.log(restOfData);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/engins`,
        restOfData
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        console.log(response.data);
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
            const [_typeparcs, _setTypeparcs] = useState([]);
            const [_parcs, _setParcs] = useState([]);
            const [_sites, _setSites] = useState([]);

            useEffect(() => {
              // check if logged in, else redirect to login page
              // if (!localStorage.getItem("accessToken")) {
              //   Navigate("/auth");
              // } else {
              axios
                .get(
                  `${process.env.REACT_APP_BASE_URL}/engins/byId/${id}`
                  // , {
                  // headers: { accessToken: localStorage.getItem("accessToken") },
                  // }
                )
                .then((response) => {
                  // console.log(response.data);
                  if (response.data.error) {
                    alert(response.data.error);
                  } else {
                    setFieldValue("title", response.data.title, true);
                    setFieldValue(
                      "description",
                      response.data.description,
                      true
                    );
                    setFieldValue("SiteId", response.data.SiteId, true);
                    setFieldValue(
                      "TypeParcId",
                      response.data.Parc.TypeParcId,
                      true
                    );
                    setFieldValue("ParcId", response.data.ParcId, true);
                    axios
                      .get(
                        `${process.env.REACT_APP_BASE_URL}/parcs/byTypeparcId/${response.data.Parc.TypeParcId}`
                        // , {
                        // headers: { accessToken: localStorage.getItem("accessToken") },
                        // }
                      )
                      .then((res) => {
                        // console.log(res.data);
                        if (res.data.error) {
                          alert(res.data.error);
                        } else {
                          setParcs(res.data);
                        }
                      });
                  }
                });
              // }
            }, []);

            const onTypeParcChange = (e) => {
              const _typeparcId = e.target.value;

              axios
                .get(
                  `${process.env.REACT_APP_BASE_URL}/parcs/byTypeparcId/${_typeparcId}`
                  // , {
                  // headers: { accessToken: localStorage.getItem("accessToken") },
                  // }
                )
                .then((response) => {
                  // console.log(response.data);
                  if (response.data.error) {
                    alert(response.data.error);
                  } else {
                    setParcs(response.data);
                    setFieldValue("TypeParcId", _typeparcId, true);
                  }
                });
            };

            return (
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
                    onChange={onTypeParcChange}
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
                    className="form-control text-uppercase"
                    id="ParcId"
                    name="ParcId"
                    placeholder="Nom du typeparc (Ex : Roulage, Terrassement, ...)"
                    autoComplete="off"
                    as="select"
                  >
                    <option value="">---- Choisir un parc</option>
                    {parcs.map((parc, key) => {
                      return (
                        <option key={key} value={parc.id}>
                          {parc.title}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="ParcId"
                    component="div"
                    className="text-danger text-left "
                  />
                </div>

                <div className="mt-2  ">
                  <Field
                    className="form-control text-uppercase"
                    id="SiteId"
                    name="SiteId"
                    placeholder="Nom du typeparc (Ex : Roulage, Terrassement, ...)"
                    autoComplete="off"
                    as="select"
                  >
                    <option value="">---- Choisir un site</option>
                    {sites.map((site, key) => {
                      return (
                        <option key={key} value={site.id}>
                          {site.title}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    name="SiteId"
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
                  <button
                    className="btn btn-sm btn-outline-primary "
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Créer
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

export default EnginUpdate;
