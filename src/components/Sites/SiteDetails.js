import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import frLocale from "moment/locale/fr";

function SiteDetails() {
  const { id } = useParams();
  const [site, setSite] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/sites/byId/${id}`
        // , {
        // headers: { accessToken: localStorage.getItem("accessToken") },
        // }
      )
      .then((response) => {
        setSite(response.data);
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
            <Card.Title>{site.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted ">
              Created : {moment(site.createdAt).fromNow()} | Updated :{" "}
              {moment(site.updatedAt).fromNow()}
            </Card.Subtitle>

            <Card.Text>{site.description}</Card.Text>
            <div className="border-top pt-2">
              <h6>liste des engins sur ce site</h6>
            </div>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default SiteDetails;
