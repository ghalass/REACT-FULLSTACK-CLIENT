// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import frLocale from "moment/locale/fr";

function SitesList() {
  moment.locale("fr", [frLocale]); // can pass in 'en', 'fr', or 'es'
  const [listOfSites, setListOfSites] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/sites`).then((response) => {
      if (!response.data.error) {
        setListOfSites(response.data);
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
          {listOfSites.map((site, key) => {
            return (
              <ListGroup.Item key={key}>
                <div className="row d-flex justify-content-between">
                  <div className="col-8">
                    <Link to={`${site.id}/details`} className="text-uppercase">
                      {site.title}
                    </Link>
                  </div>
                  <div className="col-4 d-flex  justify-content-around border-left">
                    <Link to={`${site.id}/delete`} className="text-danger">
                      <FontAwesomeIcon icon={faTrashCan} className="mx-2 " />
                    </Link>
                    <Link to={`${site.id}/update`} className="">
                      <FontAwesomeIcon icon={faPenNib} className="mx-2 " />
                    </Link>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default SitesList;
