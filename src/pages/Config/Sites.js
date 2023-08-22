import React, { useEffect, useState } from "react";
import axios from "axios";
import { SitesList } from "../../components/Sites/SitesList";
import { SiteForm } from "../../components/Sites/SiteForm";
import { SiteDetails } from "../../components/Sites/SiteDetails";
import { toast } from "react-toastify";

function Sites() {
  const [listOfObjects, setListOfObjects] = useState([]);
  const [records, setRecords] = useState(listOfObjects);

  const [isLoading, setIsLoading] = useState(true);
  const [isProcess, setIsProcess] = useState(false);

  const [operation, setOperation] = useState("");
  const [object, setObject] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/sites`)
      .then((response) => {
        if (!response.data.error) {
          setListOfObjects(response.data);
          setRecords(response.data);
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Sites : " + error.message);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <div className="text-left m-2 p-2">
      <div className="row px-2">
        <div className="px-1 col-md">
          {/* CARD LIST */}
          <SitesList
            records={records}
            setRecords={setRecords}
            isLoading={isLoading}
            setObject={setObject}
            listOfObjects={listOfObjects}
            setOperation={setOperation}
          />
        </div>

        {/* CARD CRUD */}
        <div className="px-1 col-md">
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

          <SiteDetails
            setOperation={setOperation}
            object={object}
            setObject={setObject}
          />
        </div>
      </div>
    </div>
  );
}

export default Sites;
