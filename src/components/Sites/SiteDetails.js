import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { SiteDetailsEngins } from "./SiteDetailsEngins";
import { SiteDetailsHeader } from "./SiteDetailsHeader";
import { LoadingSpinner } from "../LoadingSpinner";
import { toast } from "react-toastify";

export const SiteDetails = ({ setOperation, object, setObject }) => {
  const [enginsList, setEnginsList] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    if (object.id) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/engins/bySiteId/${object.id}`)
        .then((response) => {
          if (!response.data.error) {
            setEnginsList(response.data);
          }
        })
        .catch((error) => {
          if (error) {
            toast.error("Engins par site : " + error.message);
          }
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [object]);

  return (
    <div>
      <Card className="mb-2 shadow-sm">
        <Card.Body className="pt-2">
          <SiteDetailsHeader
            setOperation={setOperation}
            object={object}
            setObject={setObject}
          />
          <div className="border-top mt-2">
            <div className="text-center">
              <h6 className="border-bottom d-inline">
                Liste des engins sur ce site
              </h6>
            </div>
            {IsLoading ? (
              <div className="d-flex justify-content-center">
                <LoadingSpinner />
              </div>
            ) : (
              <SiteDetailsEngins object={object} enginsList={enginsList} />
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
