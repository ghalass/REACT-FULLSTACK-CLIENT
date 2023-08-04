// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPenNib,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import frLocale from "moment/locale/fr";

function ParcsList() {
  moment.locale("fr", [frLocale]); // can pass in 'en', 'fr', or 'es'
  const [listOfObjects, setListOfObjects] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/parcs`).then((response) => {
      if (!response.data.error) {
        setListOfObjects(response.data);
      } else {
        alert(response.data.error);
      }
    });
  }, []);
  return (
    <Card className="shadow-sm">
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
                      <Link to={`${object.id}/delete`} className="text-danger">
                        <FontAwesomeIcon icon={faTrashCan} className="mx-2 " />
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
  );
}

export default ParcsList;
