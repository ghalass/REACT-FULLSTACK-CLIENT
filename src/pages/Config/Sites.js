import React, { useEffect, useState } from "react";
import axios from "axios";
import { SitesList } from "../../components/Sites/SitesList";
import { SiteForm } from "../../components/Sites/SiteForm";
import { SiteDetails } from "../../components/Sites/SiteDetails";
import { useLoaderData } from "react-router-dom";

function Sites() {
  const [listOfObjects, setListOfObjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcess, setIsProcess] = useState(false);

  const [operation, setOperation] = useState("");
  const [object, setObject] = useState({});
  const [records, setRecords] = useState(listOfObjects);
  useEffect(() => {
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

  // const sitesListLoader = useLoaderData();

  return (
    <div className="text-left m-2 p-2">
      <div className="row px-2">
        <div className="px-1 col-md">
          {/* <Outlet /> */}

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

          <SiteDetails setOperation={setOperation} object={object} />
        </div>
      </div>
    </div>
  );
}

export default Sites;
