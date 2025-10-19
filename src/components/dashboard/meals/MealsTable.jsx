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
  Select,
  OutlinedInput,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useMeals } from "../../../hooks/useMeals";
import { usePagination } from "../../../hooks/usePagination";

import MealsTableRows from "./MealsTableRows";
import ModalForm from "./ModalForm";
import Loading from "../../Loading";
const rates = [
  { value: "TopRate", label: "Top Rate" },
  { value: "LowRate", label: "Low Rate" },
];

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

// MealsTable component displays a searchable and filterable table of meals
const MealsTable = () => {
  const { data: meals, isLoading } = useMeals(); // Fetch meals data using custom hook
  const {
    pagedItems,
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  } = usePagination(meals, 5);
  const [query, setQuery] = React.useState(""); // State to manage search query
  const [rate, setRate] = React.useState("");
  const handleSelect = (e) => {
    setRate(e.target.value);
  };
  const handleSearch = (e) => {
    setQuery(e.target.value); // Update search query on input change
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("add");
  const [mealId, setMealId] = React.useState(null); // State to manage selected meal ID for editing
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  if (isLoading) return <Loading />; // Show loading message while data is being fetched

  return (
    <>
      <Container maxWidth="lg" sx={{ padding: 2 }}>
        {/* Header section with title, search bar, and add button */}
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h2">Meals</Typography>
          <Box component={"form"}>
            <FormControl>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                sx={{ width: 300 }}
                value={query}
                onChange={handleSearch} // Handle search input changes
              />
            </FormControl>
          </Box>
          <Box component={"form"}>
            <FormControl
              size="medium"
              sx={{ width: "300px", fontFamily: "var(--font)" }}
            >
              <Select
                displayEmpty
                value={rate}
                onChange={handleSelect}
                input={<OutlinedInput />}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Filter By Rate</em>
                </MenuItem>
                {rates.map((rate) => (
                  <MenuItem key={rate.label} value={rate.value}>
                    {rate.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              setMealId(null);
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
            Add New Meal
          </Button>
        </Stack>
        {/* Table section displaying meals */}
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/* Table headers */}
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Image
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Name
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Price
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Orders Count
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  rate
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Serves
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Time
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
              <MealsTableRows
                meals={pagedItems}
                query={query}
                rate={rate}
                styled={styled}
                setModalType={setModalType}
                setOpenModal={setOpenModal}
                handleModalOpen={handleModalOpen}
                setMealId={setMealId}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={meals.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
        />
      </Container>
      <ModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleClose={handleModalClose}
        style={style}
        modalType={modalType}
        mealId={mealId}
        setMealId={setMealId}
      />
    </>
  );
};

export default MealsTable;
