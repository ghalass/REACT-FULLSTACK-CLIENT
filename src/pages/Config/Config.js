import React, { useState } from "react";

import Nav from "react-bootstrap/Nav";

import { Link, Outlet } from "react-router-dom";
// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTruckPlane,
  faTruckMonster,
} from "@fortawesome/free-solid-svg-icons";

function Config(props) {
  const [active, setActive] = useState("sites");

  return (
    <div className="">
      {/* COMMUN PART */}
      <Nav
        defaultActiveKey="/config/sites"
        className="AppHeader-localBar border-bottom"
      >
        <Nav.Item className="px-1">
          <Nav.Link
            className={active === "sites" ? "activeLink" : ""}
            as={Link}
            to="sites"
            onClick={() => {
              console.log("sites");
              setActive("sites");
            }}
          >
            <span>
              <FontAwesomeIcon icon={faLocationDot} className="mx-2" />
              Sites
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="px-1">
          <Nav.Link
            className={"px-0 " && active === "typeparcs" ? "activeLink" : ""}
            as={Link}
            to="/config/typeparcs"
            onClick={() => {
              console.log("typeparcs");
              setActive("typeparcs");
            }}
          >
            <span>
              <FontAwesomeIcon icon={faTruckPlane} className="mx-2" />
              Types parcs
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="px-1">
          <Nav.Link
            className={active === "parcs" ? "activeLink" : ""}
            as={Link}
            to="/config/parcs"
            onClick={() => {
              console.log("parcs");
              setActive("parcs");
            }}
          >
            <span>
              <FontAwesomeIcon icon={faTruckMonster} className="mx-2" />
              Parcs
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="px-1">
          <Nav.Link
            className={active === "engins" ? "activeLink" : ""}
            as={Link}
            to="/config/engins"
            onClick={() => {
              console.log("engins");
              setActive("engins");
            }}
          >
            <span>
              <FontAwesomeIcon icon={faTruckMonster} className="mx-2" />
              Engins
            </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-2">
        <div className="border-bottom py-2 mb-2">
          <h5 className="text-left mx-3">Configurations des données de base</h5>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Config;
