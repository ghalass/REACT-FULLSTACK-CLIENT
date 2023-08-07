import React from "react";

export const SitesListSearch = ({ listOfObjects, setRecords }) => {
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

  return (
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
  );
};
