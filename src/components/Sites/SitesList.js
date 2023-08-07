import React from "react";
import DataTable from "react-data-table-component";
import LoadingSpinner from "../../helpers/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import moment from "moment";
export const SitesList = ({
  records,
  setRecords,
  isLoading,
  setObject,
  listOfObjects,
  setOperation,
}) => {
  //   console.log(props);
  const handleSearch = (e) => {
    const txtSeach = e.target.value;
    const newData = listOfObjects.filter((r) => {
      return (
        r.title.toLowerCase().includes(txtSeach.toLowerCase()) ||
        r.description.toLowerCase().includes(txtSeach.toLowerCase()) ||
        r.createdAt.toLowerCase().includes(txtSeach.toLowerCase()) ||
        r.updatedAt.toLowerCase().includes(txtSeach.toLowerCase())
      );
    });
    setRecords(newData);
  };

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
      <div className="d-flex justify-content-end">
        <div>
          <input
            type="text"
            placeholder="Rechercher ..."
            className="form-control float-left"
            onChange={handleSearch}
          />
        </div>
      </div>
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
    </>
  );
};
