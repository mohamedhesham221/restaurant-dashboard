import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import {
  Box,
  TableCell,
  TableRow,
  Button,
  ButtonGroup,
  tableCellClasses,
  Avatar,
} from "@mui/material";

/**
 * Maps inventory status keys ("enough", "moderate", "low") to their hex color codes.
 */
const statusColors = {
  enough: "#73946B",
  moderate: "#f7ae31ff",
  low: "#E55050",
};
/**
 * Get the color associated with an inventory status.
 * Status name ("enough", "moderate", or other → "low").
 * @returns {string} Corresponding color value from statusColors.
 */
const setStatusColor = (status) => {
  switch (status) {
    case "enough":
      return statusColors.enough
    case "moderate":
      return statusColors.moderate
    default:
      return statusColors.low
  }
};

const RenderInventoryRow = ({
  item,
  styled,
  setItemId,
  setFormType,
  handleModalOpen,
  setOpenDeleteModal,
}) => {
  // StyledTableCell: Custom styled table cell using MUI's styling system
  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: "var(--font)",
      whiteSpace: "nowrap",
      textTransform: "capitalize !important",
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
  /**
   * Formats the item's creation timestamp to a localized date string
   */
  const updatedDate = () => {
    const date = item.createdAt && item.createdAt.toDate().toLocaleString();
    const comma = date.search(",");
    return date.slice(0,comma)
  }

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row" align="center">
          {item.item}
        </StyledTableCell>
        <StyledTableCell align="center">{item.category}</StyledTableCell>
        <StyledTableCell align="center">{item.quantity}</StyledTableCell>
        <StyledTableCell align="center">{item.unit}</StyledTableCell>
        <StyledTableCell align="center">
          <Box component="span">{item.status}</Box>
          <Box component="sub" sx={{ color: setStatusColor(item.status) }}>
            {item.status === "enough" && (
              <KeyboardDoubleArrowUpIcon fontSize="small" />
            )}
            {item.status === "moderate" && (
              <HorizontalRuleIcon fontSize="small" />
            )}
            {item.status === "low" && (
              <KeyboardDoubleArrowDownIcon fontSize="small" />
            )}
          </Box>
        </StyledTableCell>
        <StyledTableCell align="center">{updatedDate()}</StyledTableCell>
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
                setItemId(item.id);
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
                setItemId(item.id);
                setOpenDeleteModal(true);
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

export default RenderInventoryRow;
