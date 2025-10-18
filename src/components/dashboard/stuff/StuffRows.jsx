import React from "react";
import RenderStuffRow from "./RenderStuffRow";
// Component to render a list of stuff rows with filtering functionality

const StuffRows = ({ stuff, styled, setOpenModal, setEmployeeId, setFormType, handleModalOpen, setOpenDeleteModal, query }) => {

  let filteredStuff = stuff;

  if (query) {
		// Filter by search query (case-insensitive match on reservation name)
		filteredStuff = stuff.filter((employee) => {
      const matchName = employee.name.toLowerCase().includes(query.toLowerCase())
      const matchRole = employee.role.toLowerCase().includes(query.toLowerCase())
      return matchName || matchRole
    }
		);
	} else {
    filteredStuff = stuff;
  }
  return (
    <>
      {filteredStuff.map((employee) => {
        return (
          <RenderStuffRow
            key={employee.id}
            employee={employee}
            setOpenModal={setOpenModal}
            styled={styled}
            query={query}
            setEmployeeId={setEmployeeId}
            setFormType={setFormType}
            handleModalOpen={handleModalOpen}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        );
      })}
    </>
  );
};

export default StuffRows;
