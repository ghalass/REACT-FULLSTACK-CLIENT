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
} from "@fortawesome/free-solid-svg-icons";

function SitesList() {
  moment.locale("fr", [frLocale]); // can pass in 'en', 'fr', or 'es'
  const [listOfObjects, setListOfObjects] = useState([]);
  const [nonFiltredData, setNonFiltredData] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/sites`).then((response) => {
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

  // Pagination
  let active = 2;
  let items = [];

  return (
    <div>
      <div className="mb-2 d-flex justify-content-start">
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
        <button
          className="btn btn-sm btn-outline-primary ml-2"
          onClick={OnSearch}
        >
          Chercher
        </button>
      </div>

      <Card className="mb-2 shadow-sm">
        <Card.Header className="p-2 d-flex justify-content-between">
          <Link to={""} className="text-dark">
            Liste
          </Link>
        </Card.Header>
        <Card.Body>
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
                      <div className="col-8">
                        <Link
                          to={`${object.id}/details`}
                          className="text-uppercase"
                        >
                          {object.title}
                        </Link>
                      </div>
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
                          <FontAwesomeIcon icon={faPenNib} className="mx-2 " />
                        </Link>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-start">
        <Pagination>
          <Pagination.Item key={1}>1</Pagination.Item>
          <Pagination.Item key={2} active activeLabel>
            2
          </Pagination.Item>
          <Pagination.Item key={3}>3</Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
}

export default SitesList;
