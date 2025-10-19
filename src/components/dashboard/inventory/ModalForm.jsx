import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getItemById,
  addItem,
  updateItem,
} from "../../../firebase/inventoryDB";
import {
  Box,
  TextField,
  FormControl,
  FormControlLabel,
  Typography,
  Button,
  Stack,
  Select,
  MenuItem,
  Modal,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

// Category options
const categoryOpt = [
  "meat",
  "vegetables",
  "oil",
  "spices",
  "sticks",
  "baking",
  "sauces",
  "packaging",
];
// Unit options
const unitOpt = ["kilogram", "gram", "liter", "piece", "milligram"];
// Status options
const statusOpt = ["enough", "moderate", "low"];
const ModalForm = ({
  openModal,
  handleClose,
  style,
  setOpenModal,
  itemId,
  setItemId,
  modalType,
}) => {
  const queryClient = useQueryClient();
  const [dataWillEdit, setDataWillEdit] = React.useState({});
  React.useEffect(() => {
    if (!itemId || itemId.length === 0) return;
    const getItemDataWillEdit = async () => {
      const data = await getItemById(itemId);
      setDataWillEdit(data);
    };
    getItemDataWillEdit();
  }, [itemId]);
  const { item, category, quantity, unit, status, maxQuantity, createdAt } =
    dataWillEdit || {};

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      item: item || "",
      category: category || "",
      quantity: quantity || "",
      unit: unit || "",
      status: status || "",
      maxQuantity: maxQuantity || "",
      createdAt: createdAt || "",
    },
  });
  // Reset form values when mealId or meal data changes
  React.useEffect(() => {
    if (itemId) {
      reset({
        item,
        category,
        quantity,
        unit,
        status,
        maxQuantity,
        createdAt,
      });
    } else {
      reset({
        item: "",
        category: "",
        quantity: "",
        unit: "",
        status: "",
        maxQuantity: "",
        createdAt: "",
      });
    }
  }, [
    category,
    createdAt,
    item,
    itemId,
    quantity,
    maxQuantity,
    reset,
    status,
    unit,
  ]);

  const addMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateItem({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
      setItemId(null);
    },
  });
  /**
   * Handle submission of the inventory modal form.
   *
   * Aborts if quantity > maxQuantity.
   * If modalType is "add" it triggers addMutation.mutate,
   * otherwise it triggers updateMutation.mutate with { id, data }, then closes the modal and logs the action.
   *
   * @param {Object} data - Form data to submit.
   * @returns {Promise<void>} Resolves after performing the mutation and UI updates.
   */
  const onSubmit = async (data) => {
    if (modalType === "add") {
      addMutation.mutate(data);
      setOpenModal(false);
      reset();
      console.log("Item Added", data);
    } else {
      updateMutation.mutate({ id: itemId, data: data });
      setOpenModal(false);
      console.log("Item Updated", data);
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
            {modalType === "add" ? "Add new item" : `Edit ${item}`}
          </Typography>
          <Box
            component={"form"}
            sx={{ marginTop: "20px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl fullWidth sx={{ gap: 2 }}>
              {/* Input field for Item Name */}
              <TextField
                label="Item"
                variant="outlined"
                name="item"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("item", { required: "Item name is required" })}
                error={!!errors.item}
                helperText={errors.item?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              {/* Category and Unit Select Box */}
              <Stack
                spacing={1}
                justifyContent={"space-between"}
                direction={{ sm: "column", md: "row" }}
              >
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel
                    slotProps={
                      modalType === "edit"
                        ? { inputLabel: { shrink: true } }
                        : ""
                    }
                  >
                    Category
                  </InputLabel>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value || ""}
                        label="Category"
                      >
                        <MenuItem value="" disabled>
                          <em>Choose Category</em>
                        </MenuItem>
                        {categoryOpt.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.category?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth error={!!errors.unit}>
                  <InputLabel
                    slotProps={
                      modalType === "edit"
                        ? { inputLabel: { shrink: true } }
                        : ""
                    }
                  >
                    Unit
                  </InputLabel>
                  <Controller
                    name="unit"
                    control={control}
                    rules={{ required: "Unit is required" }}
                    render={({ field }) => (
                      <Select {...field} value={field.value || ""} label="Unit">
                        <MenuItem value="" disabled>
                          <em>Choose Unit</em>
                        </MenuItem>
                        {unitOpt.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.category?.message}</FormHelperText>
                </FormControl>
              </Stack>

              {/**quantity and unit row */}
              <Stack
                spacing={1}
                justifyContent={"space-between"}
                direction={{ sm: "column", md: "row" }}
              >
                {/* Input field for item quantity*/}
                <TextField
                  label="Quantity"
                  variant="outlined"
                  name="quantity"
                  type="number"
                  sx={{ fontFamily: "var(--font)" }}
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  fullWidth
                  slotProps={{
                    input: {
                      inputProps: {
                        min: 0,
                        max: watch("maxQuantity") || undefined,
                      },
                    },
                    inputLabel:
                      modalType === "edit" ? { shrink: true } : undefined,
                  }}
                />
                {/**Max Quantity select box */}
                <TextField
                  label="Max Quantity"
                  variant="outlined"
                  name="maxQuantity"
                  type="number"
                  sx={{ fontFamily: "var(--font)" }}
                  {...register("maxQuantity", { valueAsNumber: true })}
                  error={!!errors.maxQuantity}
                  helperText={errors.maxQuantity?.message}
                  fullWidth
                  slotProps={
                    modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                  }
                />
              </Stack>

              {/* radio field for Item status */}
              <FormControl component="fieldset" error={!!errors.status}>
                <InputLabel shrink={true} sx={{ fontSize: "1rem" }}>
                  Status
                </InputLabel>

                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <RadioGroup
                      row
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {statusOpt.map((opt) => (
                        <FormControlLabel
                          key={opt}
                          value={opt}
                          control={<Radio />}
                          label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                <FormHelperText>{errors.status?.message}</FormHelperText>
              </FormControl>
              {/**submit button */}
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
