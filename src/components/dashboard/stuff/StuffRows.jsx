import React from "react";
import RenderStuffRow from "./RenderStuffRow";
// Component to render a list of stuff rows with filtering functionality

const StuffRows = ({ stuff, styled, setOpenModal, setEmployeeId, setFormType, handleModalOpen, setOpenDeleteModal }) => {

  return (
    <>
      {stuff.map((employee) => {
        return (
          <RenderStuffRow
            key={employee.id}
            employee={employee}
            setOpenModal={setOpenModal}
            styled={styled}
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
