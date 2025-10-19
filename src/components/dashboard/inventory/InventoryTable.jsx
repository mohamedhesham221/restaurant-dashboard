import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TextField,
  FormControl,
  Typography,
  Button,
  Paper,
  tableCellClasses,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Loading from "../../Loading";
import { useInventory } from "../../../hooks/useInventory";
import InventoryRows from "./InventoryRows";
import ModalForm from "./ModalForm";
import DeleteItemWarning from "./DeleteItemWarning";
import { usePagination } from "../../../hooks/usePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#10181B",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InventoryTable = () => {
  const { data: inventory, isLoading } = useInventory();
  const {
    pagedItems,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  } = usePagination(inventory, 5);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("add");
  const [itemId, setItemId] = React.useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [query, setQuery] = React.useState(""); // State to manage search query

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const handleSearch = (e) => {
    setQuery(e.target.value); // Update search query on input change
  };

  if (isLoading) return <Loading />; // Show loading spinner while data is being fetched

  return (
    <>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h2" textAlign={"start"} gutterBottom>
            Inventory
          </Typography>
          <Box component={"form"}>
            <FormControl>
              <TextField
                label="Search"
                variant="standard"
                placeholder="Type item name"
                size="small"
                sx={{ width: { xs: "100%", lg: "300px" } }}
                value={query}
                onChange={handleSearch}
              />
            </FormControl>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              setItemId(null);
              handleModalOpen();
              setModalType("add");
            }}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "var(--highlight-color)",
              fontWeight: "500",
              color: "var(--primary-text)",
              textTransform: "none",
              fontFamily: "var(--font)",
            }}
          >
            Add new item
          </Button>
        </Stack>
        {inventory.length === 0 || !inventory ? (
          <Typography
            variant="h2"
            textAlign={"center"}
            sx={{
              marginTop: "6rem",
              fontSize: "2rem",
              color: "var(--secondary-text)",
              fontFamily: "var(--font)",
            }}
          >
            Inventory is empty!!
          </Typography>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {/* Table headers */}
                    <StyledTableCell align="center">Item</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ fontFamily: "var(--font)" }}
                    >
                      Category
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ fontFamily: "var(--font)" }}
                    >
                      Quantity
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ fontFamily: "var(--font)" }}
                    >
                      Unit
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ fontFamily: "var(--font)" }}
                    >
                      Status
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ fontFamily: "var(--font)" }}
                    >
                      Max Quantity
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ fontFamily: "var(--font)" }}
                    >
                      Last Updated
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ fontFamily: "var(--font)" }}
                    >
                      Actions
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Render rows of stuff*/}
                  <InventoryRows
                    inventory={pagedItems}
                    setOpenModal={setOpenModal}
                    styled={styled}
                    query={query}
                    setItemId={setItemId}
                    setFormType={setModalType}
                    handleModalOpen={handleModalOpen}
                    setOpenDeleteModal={setOpenDeleteModal}
                  />
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={inventory.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              component="div"
            />
          </>
        )}
      </Container>
      <ModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleClose={handleModalClose}
        style={style}
        itemId={itemId}
        setItemId={setItemId}
        modalType={modalType}
      />
      <DeleteItemWarning
        itemId={itemId}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
};

export default InventoryTable;
