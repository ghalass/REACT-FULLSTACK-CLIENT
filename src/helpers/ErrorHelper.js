import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouteError } from "react-router-dom";

export default function ErrorHelper() {
  let error = useRouteError();
  return (
    <div className="alert alert-danger">
      <h1>Error</h1>
      <h3>
        <FontAwesomeIcon icon={faCircleExclamation} className="mr-2" />
        {error.message}
      </h3>
    </div>
  );
}
