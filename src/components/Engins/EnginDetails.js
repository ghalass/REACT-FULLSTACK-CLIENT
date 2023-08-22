import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import frLocale from "moment/locale/fr";

function EnginDetails() {
  const { id } = useParams();
  const [objet, setObject] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/engins/byId/${id}`
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        setObject(response.data);
      });
  }, []);

  return (
    <Card className="shadow-sm">
      <Card.Header className="p-2 d-flex justify-content-between">
        <span className="">Détails </span>
      </Card.Header>
      <Card.Body className="p-2">
        <Card className="text-uppercase">
          <Card.Body>
            <Card.Title>{objet.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted ">
              Created : {moment(objet.createdAt).fromNow()} | Updated :{" "}
              {moment(objet.updatedAt).fromNow()}
            </Card.Subtitle>

            <Card.Text>{objet.description}</Card.Text>
            <div className="border-top pt-2">
              <h6>liste des engins sur ce site</h6>
            </div>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default EnginDetails;
