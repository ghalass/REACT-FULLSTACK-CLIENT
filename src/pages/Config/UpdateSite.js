import React, { useContext, useEffect } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { AuthContext } from "../../helpers/AuthContext";
import Config from "./Config";

function UpdateSite() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // check if logged in, else redirect to login page
    if (!localStorage.getItem("accessToken")) {
      navigate("/auth");
    }
  }, []);

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/posts`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate(`/config/sites`);
      });
  };

  return (
    <Config active="sites">
      <div className="container">
        <Link to="/config/sites">Sites</Link>

        <h6>Update Site</h6>
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
                placeholder="Titre du site"
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
                className="form-control "
                id="description"
                name="description"
                placeholder="Description"
                autoComplete="off"
              />
              <ErrorMessage
                name="postText"
                component="div"
                className="text-danger text-left "
              />
            </div>

            <div className="mt-2  d-flex justify-content-end">
              <button className="btn btn-sm btn-outline-primary " type="submit">
                Create
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Config>
  );
}

export default UpdateSite;
