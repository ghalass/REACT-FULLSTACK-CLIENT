import React, { useEffect, useState } from "react";
// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faList,
  faInfoCircle,
  faTrashCan,
  faPenNib,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import { SitesList } from "../../components/Sites/SitesList";
import { SiteForm } from "../../components/Sites/SiteForm";
import { SiteDetails } from "../../components/Sites/SiteDetails";

function Sites() {
  const [listOfObjects, setListOfObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcess, setIsProcess] = useState(false);

  const [operation, setOperation] = useState("");
  const [object, setObject] = useState({});
  const [records, setRecords] = useState(listOfObjects);
  useEffect(() => {
    // setIsLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/sites`).then((response) => {
      if (!response.data.error) {
        setListOfObjects(response.data);
        setRecords(response.data);
      } else {
        alert(response.data.error);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  return (
    <div className="">
      <div className="text-left m-2 p-2">
        <div className="row">
          <div className={"pr-1 col"}>
            {/* <Outlet /> */}

            {/* CARD LIST */}
            <Card className="mb-2 shadow-sm">
              <Card.Header className="p-2 d-flex justify-content-between">
                Liste
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mx-2 btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setOperation("add");
                    setObject({});
                  }}
                />
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush" className="">
                  <SitesList
                    records={records}
                    setRecords={setRecords}
                    isLoading={isLoading}
                    setObject={setObject}
                    listOfObjects={listOfObjects}
                    setOperation={setOperation}
                  />
                </ListGroup>
              </Card.Body>
            </Card>
          </div>

          {/* CARD CRUD */}
          <div className={"pr-1 col"}>
            <SiteForm
              operation={operation}
              setOperation={setOperation}
              object={object}
              setObject={setObject}
              isProcess={isProcess}
              setIsProcess={setIsProcess}
              listOfObjects={listOfObjects}
              setListOfObjects={setListOfObjects}
              records={records}
              setRecords={setRecords}
            />

            <SiteDetails setOperation={setOperation} object={object} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sites;
