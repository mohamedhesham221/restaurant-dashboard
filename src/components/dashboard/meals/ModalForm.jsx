import * as React from "react";
import { useForm } from "react-hook-form";
import { addMeal, updateMeal, getMealById } from "../../../firebase/mealsDB";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  TextField,
  FormControl,
  Typography,
  Button,
  Stack,
  Modal,
} from "@mui/material";
import { useUploadImageImgbb } from "../../../hooks/useUploadImgbb";
// AddModal component handles the functionality of adding a new meal
// It uses react-hook-form for form handling and react-query for data mutation
// ModalForm component handles both adding and editing meals
// It uses react-hook-form for form handling and react-query for data mutation
const ModalForm = ({
  openModal,
  handleClose,
  style,
  modalType,
  mealId,
  setOpenModal,
  setMealId,
}) => {
  const queryClient = useQueryClient();
  const [dataWillEdit, setDataWillEdit] = React.useState({});

  // Fetch meal data for editing when mealId is provided
  React.useEffect(() => {
    if (!mealId || mealId.length === 0) return;
    const getMealDataWillEdit = async () => {
      const data = await getMealById(mealId);
      setDataWillEdit(data);
    };
    getMealDataWillEdit();
  }, [mealId]);

  const { img, name, price, ordersCount, serves, time, rate } =
    dataWillEdit || {};
  console.log(dataWillEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      img: img || "",
      name: name || "",
      price: price || "",
      ordersCount: ordersCount || "",
      serves: serves || "",
      time: time || "",
      rate: rate || "",
    },
  });

  // Reset form values when mealId or meal data changes
  React.useEffect(() => {
    if (mealId) {
      reset({
        img,
        name,
        price,
        ordersCount,
        serves,
        time,
        rate,
      });
    } else {
      reset({
        img: "",
        name: "",
        price: "",
        ordersCount: "",
        serves: "",
        time: "",
        rate: "",
      });
    }
  }, [img, name, price, ordersCount, serves, time, rate, mealId, reset]);

  // Mutation to add a new meal and invalidate the "meals" query cache on success
  const addMutation = useMutation({
    mutationFn: addMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "meals" });
    },
  });

  // Mutation to update an existing meal and invalidate the "meals" query cache on success
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateMeal({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "meals" });
      setMealId(null);
    },
  });

  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const { uploadImage, loading, error, setError } = useUploadImageImgbb(apiKey);

  React.useEffect(() => {
    if (modalType === "add") {
      setError(null);
    }
  }, [modalType, setError]);
  // Form submission handler
  const onSubmit = async (data) => {
    const file = data.img[0];
    const url = await uploadImage(file);
    if (url && modalType === "add") {
      const finalData = {
        ...data,
        img: url,
      };
      console.log("Image uploaded at:", url);
      addMutation.mutate(finalData);
      console.log("Meal data submitted:", finalData);

      setOpenModal(false);
      reset();
    } else {
      updateMutation.mutate({ id: mealId, data: data });
      setOpenModal(false);

      console.log("Meal data submitted:", data);
    }
  };

  return (
    <>
      {/* Modal for adding or editing a meal */}
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
            {modalType === "add" ? "Add" : "Edit"} Meal
          </Typography>
          <Box
            component={"form"}
            sx={{ marginTop: "20px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl fullWidth sx={{ gap: 2 }}>
              {mealId ? (
                <Box
                  component="img"
                  src={img}
                  alt={name}
                  sx={{ objectFit: "cover", width: "100%", height: "200px" }}
                />
              ) : (
                <>
                  <TextField
                    label="Upload Image"
                    variant="outlined"
                    name="img"
                    type="file"
                    focused
                    sx={{ fontFamily: "var(--font)" }}
                    {...register("img", {
                      required:
                        modalType === "add" ? "Image is required" : false,
                    })}
                    error={!!errors.img}
                    helperText={errors.img?.message}
                    fullWidth
                    slotProps={{
                      input: {
                        accept: "image/*",
                      },
                      ...(modalType === "edit" && {
                        inputLabel: { shrink: true },
                      }),
                    }}
                  />
                  {error && modalType === "add" && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                </>
              )}

              {/* Input field for Meal Name */}
              <TextField
                label="Meal Name"
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
              {/* Input field for Price */}
              <TextField
                label="Price"
                variant="outlined"
                name="price"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("price", {
                  required: "Price is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Please enter a valid price (e.g. 19.99)",
                  },
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              {/* Input field for Rate */}
              <TextField
                label="Rate"
                variant="outlined"
                name="rate"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("rate", {
                  required: "Rate is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Please enter a valid price (e.g. 19.99)",
                  },
                })}
                error={!!errors.rate}
                helperText={errors.rate?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              <Stack direction="row" spacing={2}>
                {/* Input field for Orders Count */}
                <TextField
                  label="Orders Count"
                  variant="outlined"
                  name="ordersCount"
                  type="number"
                  sx={{ fontFamily: "var(--font)" }}
                  {...register("ordersCount", {
                    required: "Orders count is required",
                  })}
                  error={!!errors.ordersCount}
                  helperText={errors.ordersCount?.message}
                  fullWidth
                  slotProps={
                    modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                  }
                />
                {/* Input field for Serves Persons */}
                <TextField
                  label="Serves Persons"
                  variant="outlined"
                  name="serves"
                  type="number"
                  sx={{ fontFamily: "var(--font)" }}
                  {...register("serves", {
                    required: "Serves persons is required",
                  })}
                  error={!!errors.serves}
                  helperText={errors.serves?.message}
                  fullWidth
                  slotProps={
                    modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                  }
                />
              </Stack>
              {/* Input field for Time */}
              <TextField
                label="Time (e.g. 30 min)"
                variant="outlined"
                name="time"
                type="text"
                sx={{ fontFamily: "var(--font)" }}
                {...register("time", { required: "Time is required" })}
                error={!!errors.time}
                helperText={errors.time?.message}
                fullWidth
                slotProps={
                  modalType === "edit" ? { inputLabel: { shrink: true } } : ""
                }
              />
              {/* Submit button */}
              <Button
                variant="contained"
                type="submit"
                loading={loading}
                loadingPosition="end"
                loadingIndicator="Updating…"
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
