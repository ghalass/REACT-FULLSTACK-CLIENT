import React from "react";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Alert, Card, ListGroup } from "react-bootstrap";
import moment from "moment";
import { SitesListSearch } from "./SitesListSearch";
export const SitesList = ({
  records,
  setRecords,
  isLoading,
  setObject,
  listOfObjects,
  setOperation,
}) => {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title.toUpperCase(),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description.toUpperCase(),
      sortable: true,
    },
    {
      name: "CreatedAt",
      selector: (row) => moment(row.createdAt).format("ll"),
      sortable: true,
    },
    {
      name: "UpdatedAt",
      selector: (row) => moment(row.updatedAt).format("ll"),
      sortable: true,
    },
  ];
  return (
    <>
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
            <SitesListSearch
              listOfObjects={listOfObjects}
              setRecords={setRecords}
            />
            <DataTable
              // title="Liste des sites :"
              noDataComponent={
                <Alert key={"idx"} variant={"info"} className="my-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                  Il n'y a aucun enregistrement à afficher
                </Alert>
              }
              columns={columns}
              data={records}
              dense="true"
              // direction="auto"
              fixedHeader="true"
              fixedHeaderScrollHeight="400px"
              highlightOnHover="true"
              pointerOnHover="true"
              responsive="true"
              // subHeader="true"
              // subHeaderAlign="right"
              // subHeaderWrap="true"
              persistTableHead="true"
              selectableRows="true"
              selectableRowsSingle="true"
              selectableRowsHighlight="true"
              selectableRowsNoSelectAll="true"
              selectableRowsVisibleOnly="true"
              progressPending={isLoading}
              progressComponent={<LoadingSpinner />}
              onRowClicked={(row, event) => {
                // console.log(event);
                // setObject(row);
              }}
              onSelectedRowsChange={({
                allSelected,
                selectedCount,
                selectedRows,
              }) => {
                setObject(selectedRows.length !== 0 ? selectedRows[0] : {});
                setOperation("");
              }}
              pagination="true"
            />
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};
