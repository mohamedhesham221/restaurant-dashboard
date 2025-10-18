import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  TableCell,
  TableRow,
  Button,
  ButtonGroup,
  tableCellClasses,
  Avatar,
} from "@mui/material";

import { TrendingUp, TrendingDown, TrendingFlat } from "@mui/icons-material";
/**Format name to tow chars */
const stringAvatar = (name = "employee") => {
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0]?.toUpperCase() || "";
  const second = parts[1]?.[0]?.toUpperCase() || "";
  return {
    children: `${first}${second}` || "E",
  };
};

const ratingColors = {
  topRate: "#73946B",
  midRate: "#f7ae31ff",
  lowRate: "#E55050",
};
const setRatingColor = (rate) => {
  if (rate >= 4.5) {
    return ratingColors.topRate;
  } else if (rate >= 3 && rate < 4.5) {
    return ratingColors.midRate;
  } else if (rate < 4) {
    return ratingColors.lowRate;
  }
};

const RenderStuffRow = ({
  styled,
  employee,
  setFormType,
  setEmployeeId,
  handleModalOpen,
  setOpenDeleteModal,
}) => {
  // StyledTableCell: Custom styled table cell using MUI's styling system
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: "var(--font)",
      whiteSpace: "nowrap",
    },
  }));

  // StyledTableRow: Custom styled table row using MUI's styling system
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // Hide the border for the last row
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row" align="center">
          <Avatar
            sx={{ fontFamily: "var(--font)" }}
            {...stringAvatar(employee?.name)}
          />
        </StyledTableCell>
        <StyledTableCell align="center">{employee.name}</StyledTableCell>
        <StyledTableCell align="center">{employee.role}</StyledTableCell>
        <StyledTableCell align="center">{employee.salary}</StyledTableCell>
        <StyledTableCell align="center">{employee.shift}</StyledTableCell>
        <StyledTableCell align="center">{employee.contact}</StyledTableCell>
        <StyledTableCell align="center">
          <Box component="span" sx={{ color: setRatingColor(employee.rating) }}>
            {employee.rating}
          </Box>
          <Box component="sub" sx={{ color: setRatingColor(employee.rating) }}>
            {employee.rating >= 4.5 ? (
              <TrendingUp fontSize="0.5rem" />
            ) : employee.rating >= 4 && employee.rating < 4.5 ? (
              <TrendingFlat fontSize="0.5rem" />
            ) : (
              <TrendingDown fontSize="0.5rem" />
            )}
          </Box>
        </StyledTableCell>
        <StyledTableCell align="center">
          <ButtonGroup>
            <Button
              variant="text"
              startIcon={<EditIcon />}
              sx={{
                fontWeight: "500",
                color: "#73946B",
                textTransform: "none",
                fontFamily: "var(--font)",
              }}
              onClick={() => {
                setFormType("edit");
                setEmployeeId(employee.id);
                handleModalOpen();
              }}
            >
              Edit
            </Button>
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              sx={{
                fontWeight: "500",
                color: "#E55050",
                textTransform: "none",
                fontFamily: "var(--font)",
              }}
              onClick={() => {
                setEmployeeId(employee.id);
                setOpenDeleteModal(true)
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default RenderStuffRow;
