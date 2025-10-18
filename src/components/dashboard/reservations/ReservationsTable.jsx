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
  IconButton,
  Paper,
  tableCellClasses,
  Select,
  OutlinedInput,
  MenuItem,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReservationForm from "../../reservations/ReservationForm";
import { styled } from "@mui/material/styles";
import { useReservations } from "../../../hooks/useReservations";
import Loading from "../../Loading";
import ReservationsRows from "./ReservationsRows";
import DeleteReservationWarning from "./DeleteReservationWarning";
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
  top: "60%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, md: 400, lg: 600 },
  minHeight: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Component to display and manage reservations table with search, add, edit, and delete functionality
const ReservationsTable = () => {
  const { data: reservations, isLoading } = useReservations(); // Fetch reservations data using custom hook
  const [openModal, setOpenModal] = React.useState(false); // State to manage modal visibility
  const [filterQuery, setFilterQuery] = React.useState("");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false); // State to manage delete confirmation modal
  const [formType, setFormType] = React.useState("add"); // State to determine form type (add/edit)
  const [reservationId, setReservationId] = React.useState(null); // State to store selected reservation ID
  const handleModalOpen = () => setOpenModal(true); // Function to open modal
  const handleModalClose = () => setOpenModal(false); // Function to close modal
  const [query, setQuery] = React.useState(""); // State to manage search query
  const handleSearch = (e) => {
    setQuery(e.target.value); // Update search query on input change
  };

  if (isLoading) return <Loading />; // Show loading spinner while data is being fetched
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h2" textAlign={"start"} gutterBottom>
          Reservations
        </Typography>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box component={"form"}>
            <FormControl>
              <TextField
                label="Search"
                variant="standard"
                placeholder="Type customer name"
                size="small"
                sx={{ width: { xs: "100%", lg: "300px" } }}
                value={query}
                onChange={handleSearch}
              />
            </FormControl>
          </Box>
          <Box component={"form"}>
            <FormControl
              sx={{ width: { xs: "100%", lg: "300px" } }}
              variant="standard"
            >
              <Select
                displayEmpty
                input={<OutlinedInput />}
                defaultValue=""
                size="medium"
                onChange={(e) => setFilterQuery(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Select Time Slot
                </MenuItem>
                <MenuItem value="12:00 PM to 4:00 PM">
                  12:00 PM to 4:00 PM
                </MenuItem>
                <MenuItem value="4:00 PM to 8:00 PM">
                  4:00 PM to 8:00 PM
                </MenuItem>
                <MenuItem value="8:00 PM to 12:00 AM">
                  8:00 PM to 12:00 AM
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box component={"form"}>
            <FormControl sx={{ width: { xs: "100%", lg: "300px" } }}>
              <Select
                displayEmpty
                input={<OutlinedInput />}
                defaultValue=""
                size="medium"
                onChange={(e) => setFilterQuery(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Filter by Guests
                </MenuItem>
                <MenuItem value="moreThan5">More than 5</MenuItem>
                <MenuItem value="lessThan5">Less than 5</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/* Table headers */}
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Customer
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Mobile
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Email
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Date
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
                  Guests
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{ fontFamily: "var(--font)" }}
                >
                  Notes
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
              {/* Render rows of reservations */}
              <ReservationsRows
                reservations={reservations}
                query={query}
                styled={styled}
                setReservationId={setReservationId}
                handleModalOpen={handleModalOpen}
                setFormType={setFormType}
                setOpenDeleteModal={setOpenDeleteModal}
                filterQuery={filterQuery}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* Modal for adding/editing reservations */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <ReservationForm
            formType={formType}
            reservationId={reservationId}
            handleModalClose={handleModalClose}
          />
          <IconButton
            onClick={handleModalClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
      {/* Modal for delete confirmation */}
      <DeleteReservationWarning
        reservationId={reservationId}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
};

export default ReservationsTable;
