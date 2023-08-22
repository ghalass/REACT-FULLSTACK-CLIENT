import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import frLocale from "moment/locale/fr";

function EnginDelete() {
  const { id } = useParams();
  const [object, setObject] = useState({});
  const navigate = useNavigate();

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
        setObject(response.data);
      });
    // }
  }, []);

  const deleteObject = (_id) => {
    // console.log(SiteId);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/engins/${_id}`
        // , {
        // headers: {
        //   accessToken: localStorage.getItem("accessToken"),
        // },
        // }
      )
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
      <Card.Header className="p-2 d-flex justify-content-between">
        <span className="text-danger">Suppression </span>
      </Card.Header>
      <Card.Body>
        <Card className="text-uppercase">
          <Card.Body>
            <Card.Title>{object.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted ">
              Created : {moment(object.createdAt).fromNow()} | Updated :{" "}
              {moment(object.updatedAt).fromNow()}
            </Card.Subtitle>

            <Card.Text>{object.description}</Card.Text>

            <div className="text-center">
              <h6>Voulez-vous vraiment supprimer cet enregistrement ?</h6>
              <div>
                <button
                  className="mr-4 btn btn-sm btn-outline-danger text-uppercase"
                  onClick={() => {
                    deleteObject(object.id);
                  }}
                >
                  oui
                </button>
                <Link
                  to={`/config/engins`}
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

export default EnginDelete;
