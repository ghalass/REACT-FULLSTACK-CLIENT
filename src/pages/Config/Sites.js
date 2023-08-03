import React from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

// fonts awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";

function Sites() {
  // Params
  return (
    <div className="">
      <Nav
        defaultActiveKey="/config/sites"
        className="AppHeader-localBar border-bottom"
      >
        <Nav.Item className="px-1">
          <Nav.Link
            className="activeLink"
            eventKey="activeLink"
            as={Link}
            to=""
          >
            <span>
              <FontAwesomeIcon icon={faList} className="mx-2" />
              Liste
            </span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="px-1">
          <Nav.Link as={Link} to="create">
            <span>
              <FontAwesomeIcon icon={faPlus} className="mx-2" />
              Ajouter
            </span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="text-left m-2 p-2">
        <Outlet />
      </div>
    </div>
  );
}

export default Sites;
