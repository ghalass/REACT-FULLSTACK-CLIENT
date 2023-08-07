import {
  faPenNib,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card } from "react-bootstrap";

export const SiteDetails = ({ setOperation, object }) => {
  return (
    <div>
      <Card className="mb-2 shadow-sm">
        <Card.Body className="pt-2">
          <div className="d-flex justify-content-between border-bottom text-center pb-2">
            <div>Détails de l'élément sélectionné</div>
            <div className="">
              <FontAwesomeIcon
                icon={faPlus}
                className="mx-2 btn btn-sm btn-outline-primary"
                onClick={() => {
                  setOperation("add");
                }}
              />
              <FontAwesomeIcon
                icon={faPenNib}
                className="mx-2 btn btn-sm btn-outline-primary"
                onClick={() => {
                  setOperation("update");
                }}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="mx-2 btn btn-sm btn-outline-danger"
                onClick={() => {
                  setOperation("delete");
                }}
              />
            </div>
          </div>
          {/* <span>ID : {object.id}</span>
          <br /> */}
          <span>Title : {object.title}</span>
          <br />
          <span>Description : {object.description}</span>

          <br />
        </Card.Body>
      </Card>
    </div>
  );
};
