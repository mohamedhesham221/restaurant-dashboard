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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Loading from "../../Loading";
import { useStuff } from "../../../hooks/useStuff";
import StuffRows from "./StuffRows";
import ModalForm from "./ModalForm";
import DeleteEmployeeWarning from "./DeleteEmployeeWarning";

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

const StuffTable = () => {
  const { data: stuff, isLoading } = useStuff();
  const [openModal, setOpenModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("add");
  const [employeeId, setEmployeeId] = React.useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

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
            Stuff
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setEmployeeId(null);
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
            New Employee
          </Button>
        </Stack>
        {stuff.length === 0 || !stuff ? (
          <Typography variant="h2" textAlign={"center"} sx={{
            marginTop: "6rem",
            fontSize: "2rem",
            color: "var(--secondary-text)",
            fontFamily: "var(--font)"
          }}>
            Not Employee yet!!
          </Typography>
        ) : (
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
                    Name
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontFamily: "var(--font)" }}
                  >
                    Role
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontFamily: "var(--font)" }}
                  >
                    Salary
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontFamily: "var(--font)" }}
                  >
                    Shift
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontFamily: "var(--font)" }}
                  >
                    Contact
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ fontFamily: "var(--font)" }}
                  >
                    Rating
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
                <StuffRows
                  setOpenModal={setOpenModal}
                  stuff={stuff}
                  styled={styled}
                  setEmployeeId={setEmployeeId}
                  setFormType={setModalType}
                  handleModalOpen={handleModalOpen}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      <ModalForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleClose={handleModalClose}
        style={style}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        modalType={modalType}
      />
      <DeleteEmployeeWarning
        employeeId={employeeId}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
};

export default StuffTable;
