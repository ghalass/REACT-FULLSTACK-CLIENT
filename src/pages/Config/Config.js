import React, { useEffect, useState } from "react";

import Nav from "react-bootstrap/Nav";

import { Link, Outlet, useLocation } from "react-router-dom";
// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTruckPlane,
  faTruckMonster,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Config() {
  const location = useLocation();
  const [active, setActive] = useState("");

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const actived = pathArray[2];
    setActive(actived);
  });

  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, stiffness: 120 }}
    >
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
        <motion.div
          className="border-bottom py-2 mb-2"
          // initial={{ x: "100vw" }}
          // animate={{ x: 0 }}
          // transition={{ delay: 0.5, stiffness: 0 }}
        >
          <h5 className="text-left mx-3">Configurations des données de base</h5>
        </motion.div>
        <Outlet />
      </div>
    </motion.div>
  );
}

export default Config;
