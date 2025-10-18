import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEmployeeById,
  addEmployee,
  updateEmployee,
} from "../../../firebase/stuffDB";
import {
  Box,
  TextField,
  FormControl,
  Typography,
  Button,
  Stack,
  Modal,
} from "@mui/material";

const ModalForm = ({
  openModal,
  handleClose,
  style,
  setOpenModal,
  employeeId,
  setEmployeeId,
  modalType,
}) => {
  const queryClient = useQueryClient();
  const [dataWillEdit, setDataWillEdit] = React.useState({});

  React.useEffect(() => {
    if (!employeeId || employeeId.length === 0) return;
    const getEmployeeDataWillEdit = async () => {
      const data = await getEmployeeById(employeeId);
      setDataWillEdit(data);
    };
    getEmployeeDataWillEdit();
  }, [employeeId]);

  const { name, role, salary, shift, contact, rating } = dataWillEdit || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name || "",
      role: role || "",
      salary: salary || "",
      shift: shift || "",
      contact: contact || "",
      rating: rating || "",
    },
  });
  // Reset form values when mealId or meal data changes
  React.useEffect(() => {
    if (employeeId) {
      reset({
        name,
        role,
        salary,
        shift,
        contact,
        rating,
      });
    } else {
      reset({
        name: "",
        role: "",
        salary: "",
        shift: "",
        contact: "",
        rating: "",
      });
    }
  }, [contact, employeeId, name, rating, reset, role, salary, shift]);

  const addMutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["stuff"]);
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateEmployee({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["stuff"]);
      setEmployeeId(null);
    },
  });
  const onSubmit = async (data) => {
    if (modalType === "add") {
      addMutation.mutate(data);
      setOpenModal(false);
      reset();
      console.log("Employee Added", data);
    } else {
      updateMutation.mutate({ id: employeeId, data: data });
      setOpenModal(false);
      console.log("Employee Updated", data);
    }
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontFamily: "var(--font)" }}
          >
            {modalType === "add" ? "Add" : "Edit"} Employee
          </Typography>
          <Box
            component={"form"}
            sx={{ marginTop: "20px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl fullWidth sx={{ gap: 2 }}>
              {/* Input field for Employee Name */}
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              {/* Input field for role */}
              <TextField
                label="Role"
                variant="outlined"
                name="role"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("role", { required: "Role is required" })}
                error={!!errors.role}
                helperText={errors.role?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              {/* Input field for Employee Name */}
              <TextField
                label="Salary"
                variant="outlined"
                name="name"
                type="number"
                sx={{ fontFamily: "var(--font)" }}
                {...register("salary", { required: "Salary is required" })}
                error={!!errors.salary}
                helperText={errors.salary?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              {/* Input field for Employee Name */}
              <TextField
                label="shift"
                variant="outlined"
                name="shift"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("shift", { required: "Shift is required" })}
                error={!!errors.shift}
                helperText={errors.shift?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              {/* Input field for Employee Name */}
              <TextField
                label="Contact"
                variant="outlined"
                name="contact"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("contact", { required: "Contact is required" })}
                error={!!errors.contact}
                helperText={errors.contact?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              {/* Input field for Employee Name */}
              <TextField
                label="Rating"
                variant="outlined"
                name="rating"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("rating", { required: "rating is required" })}
                error={!!errors.rating}
                helperText={errors.rating?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "var(--highlight-color)",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                  color: "var(--primary-text)",
                  textTransform: "none",
                  fontFamily: "var(--font)",
                }}
              >
                {modalType === "add" ? "Add" : "Update"}
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalForm;
