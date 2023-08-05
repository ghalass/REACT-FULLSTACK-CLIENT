//#region IMPORTS
import React, { useEffect } from "react";
import { Button, Card, Form, ListGroup, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import frLocale from "moment/locale/fr"; // fonts awsome icons
// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenNib,
  faTrashCan,
  faInfoCircle,
  faL,
} from "@fortawesome/free-solid-svg-icons";

import { motion } from "framer-motion";
//#endregion

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
function SitesList() {
  moment.locale("fr", [frLocale]); // can pass in 'en', 'fr', or 'es'
  //#region STATES
  const [listOfObjects, setListOfObjects] = useState([]);
  const [nonFiltredData, setNonFiltredData] = useState();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //#endregion

  //#region FONCTIONS
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/sites`).then((response) => {
      setIsLoading(false);
      if (!response.data.error) {
        setListOfObjects(response.data);
        setNonFiltredData(response.data);
      } else {
        alert(response.data.error);
      }
    });
  }, []);

  const OnSearch = () => {
    let result = [];
    if (search.trim() !== "") {
      result = listOfObjects.filter((s) => {
        return s.title.toLowerCase().includes(search.toLowerCase());
      });
      setListOfObjects(result);
    } else {
      setListOfObjects(nonFiltredData);
    }
  };
  //#endregion

  // Pagination
  return (
    <motion.div variants={containerVariant}>
      <motion.div className="mb-2 d-flex justify-content-start">
        <motion.div variants={searchDivVariant}>
          <Form.Group>
            <Form.Control
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Chercher ..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  OnSearch();
                }
              }}
            />
          </Form.Group>
        </motion.div>
        <motion.button
          className="btn btn-sm btn-outline-primary ml-2"
          onClick={OnSearch}
          variants={searchDivButtonVariant}
        >
          Chercher
        </motion.button>
      </motion.div>

      <motion.div
        transition={{
          delay: 0,
          duration: 0.75,
          type: "spring",
          when: "beforeChildren",
          // stiffness: 20,
        }}
      >
        <Card className="mb-2 shadow-sm">
          <Card.Header className="p-2 d-flex justify-content-between">
            <Link to={""} className="text-dark">
              Liste
            </Link>
          </Card.Header>
          <Card.Body>
            {isLoading ? (
              "Loading ..."
            ) : (
              <ListGroup variant="flush" className="">
                {!listOfObjects.length ? (
                  <div className="alert alert-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="mx-2 " />
                    Aucun enregistrement n'est trouvé !{" "}
                  </div>
                ) : (
                  listOfObjects.map((object, key) => {
                    return (
                      <ListGroup.Item key={key}>
                        <div className="row d-flex justify-content-between">
                          <motion.div
                            className="col-8 "
                            variants={tableVariant}
                            animate="visible"
                            whileHover="hover"
                          >
                            <Link
                              to={`${object.id}/details`}
                              className="text-uppercase text-decoration-none"
                            >
                              {object.title}
                            </Link>
                          </motion.div>

                          <div className="col-4 d-flex  justify-content-around border-left">
                            <Link
                              to={`${object.id}/delete`}
                              className="text-danger"
                            >
                              <FontAwesomeIcon
                                icon={faTrashCan}
                                className="mx-2 "
                              />
                            </Link>
                            <Link to={`${object.id}/update`} className="">
                              <FontAwesomeIcon
                                icon={faPenNib}
                                className="mx-2 "
                              />
                            </Link>
                          </div>
                        </div>
                      </ListGroup.Item>
                    );
                  })
                )}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </motion.div>

      <motion.div
        className="d-flex justify-content-start"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{
          delay: 0.75,
          duration: 0.5,
          type: "spring",
          // stiffness: 20,
        }}
      >
        <Pagination>
          <Pagination.Item key={1}>1</Pagination.Item>
          <Pagination.Item key={2} active activeLabel>
            2
          </Pagination.Item>
          <Pagination.Item key={3}>3</Pagination.Item>
        </Pagination>
      </motion.div>
    </motion.div>
  );
}

export default SitesList;
