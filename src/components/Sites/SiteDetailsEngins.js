import React from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SiteDetailsEngins = ({ object, enginsList }) => {
  return (
    <div className="text-center mt-2">
      <div>
        {object.id ? (
          <>
            {enginsList.length !== 0 ? (
              enginsList.map((engin, i) => {
                return (
                  <>
                    <Link
                      to={`/config/engins/${engin.id}/details`}
                      className="text-uppercase mx-1"
                    >
                      {engin.title}
                    </Link>
                    |
                    <Link
                      to={`/config/parcs/${engin.Parc.id}/details`}
                      className="text-uppercase mx-1"
                    >
                      {engin.Parc.title}
                    </Link>
                    |
                    <Link
                      to={`/config/typeparcs/${engin.Parc.TypeParc.id}/details`}
                      className="text-uppercase mx-1"
                    >
                      {engin.Parc.TypeParc.title}
                    </Link>
                  </>
                );
              })
            ) : (
              <>
                <div>
                  Aucun engin sur le site de :
                  <Badge
                    pill
                    variant="light"
                    className="mx-1 text-uppercase h6 py-1 px-3 bg-light shadow-sm"
                  >
                    {object.title}
                  </Badge>
                </div>
              </>
            )}
          </>
        ) : (
          "Aucun site selectionné !"
        )}
      </div>
    </div>
  );
};
