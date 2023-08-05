import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import frLocale from "moment/locale/fr";
import { toast } from "react-toastify";

function SiteDelete() {
  const { id } = useParams();
  const [site, setSite] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // check if logged in, else redirect to login page
    // if (!localStorage.getItem("accessToken")) {
    //   Navigate("/auth");
    // } else {
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
    // }
  }, []);

  const deleteObject = (SiteId) => {
    // console.log(SiteId);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/sites/${SiteId}`
        // , {
        // headers: {
        //   accessToken: localStorage.getItem("accessToken"),
        // },
        // }
      )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          navigate(-1);
          toast.info("Supprimé avec succès.");
        }
      });
  };
  return (
    <Card className="shadow-sm">
      <Card.Header className="p-2 d-flex justify-content-between">
        <span className="text-danger">Suppression </span>
      </Card.Header>
      <Card.Body>
        <Card className="text-uppercase">
          <Card.Body>
            <Card.Title>{site.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted ">
              Created : {moment(site.createdAt).fromNow()} | Updated :{" "}
              {moment(site.updatedAt).fromNow()}
            </Card.Subtitle>

            <Card.Text>{site.description}</Card.Text>

            <div className="text-center">
              <h6>Voulez-vous vraiment supprimer cet enregistrement ?</h6>
              <div>
                <button
                  className="mr-4 btn btn-sm btn-outline-danger text-uppercase"
                  onClick={() => {
                    deleteObject(site.id);
                  }}
                >
                  oui
                </button>
                <Link
                  to={`/config/sites`}
                  className="ml-2 btn btn-sm btn-outline-success"
                >
                  non
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default SiteDelete;
