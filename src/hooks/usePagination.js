import * as React from "react";

export const usePagination = (data, rows = 5) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rows);
  const pagedItems = React.useMemo(
    () => data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [data, page, rowsPerPage]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    pagedItems,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  };
};
