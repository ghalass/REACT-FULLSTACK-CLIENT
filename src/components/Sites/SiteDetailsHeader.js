import {
  faPenNib,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SiteDetailsHeader = ({ setOperation, object }) => {
  return (
    <div>
      <div className="d-flex justify-content-between border-bottom text-center mb-2 pb-2">
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

      <span className="text-uppercase">Title : {object.title}</span>
      <br />
      <span className="text-uppercase">Description : {object.description}</span>

      <br />
    </div>
  );
};
