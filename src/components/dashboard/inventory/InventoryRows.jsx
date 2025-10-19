import React from "react";
import RenderInventoryRow from "./RenderInventoryRow";
const InventoryRows = ({
  inventory,
  setOpenModal,
  styled,
  query,
  setItemId,
  setFormType,
  handleModalOpen,
  setOpenDeleteModal,
}) => {
  let filteredInventory = inventory;

  if (query) {
    // Filter by search query (case-insensitive match on reservation name)
    filteredInventory = inventory.filter((item) => {
      const matchItem = item.item
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchItem;
    });
  } else {
    filteredInventory = inventory;
  }
  return (
    <>
      {filteredInventory.map((item) => {
        return (
          <RenderInventoryRow
            key={item.id}
            item={item}
            setOpenModal={setOpenModal}
            styled={styled}
            query={query}
            setItemId={setItemId}
            setFormType={setFormType}
            handleModalOpen={handleModalOpen}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        );
      })}
    </>
  );
};

export default InventoryRows;
