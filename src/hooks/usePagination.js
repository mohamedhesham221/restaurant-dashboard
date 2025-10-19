import * as React from "react";

export const usePagination = (data, rows = 5) => {
  // Pagination state
  const [page, setPage] = React.useState(0);
  // Rows per page state
  const [rowsPerPage, setRowsPerPage] = React.useState(rows);
  // Memoized paged items
  const pagedItems = React.useMemo(
    () => data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, page, rowsPerPage]
  );
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Return pagination state and handlers
  return {
    pagedItems,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  };
};
