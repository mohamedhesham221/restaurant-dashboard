import * as React from "react";
import { TextField, Button, Box, FormControl, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../firebase/firebaseAuth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityPassword from "./VisibilityPassword";
const RegisterForm = () => {
  const [formMessage, setFormMessage] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();
  // Destructure methods from useForm hook for form handling
  const {
    register, // Used to register input fields for validation
    handleSubmit, // Handles form submission
    formState: { errors }, // Contains validation errors
    reset, // Resets the form fields
  } = useForm({
    // Set default values for the form fields
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data); // Log form data for debugging
    const { name, email, password } = data; // Destructure form data
    try {
      // Attempt to register the user with provided credentials
      await registerUser(email, password, name);
      setFormMessage("success"); // Set success message
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 1.5 seconds
      }, 1500);
    } catch (error) {
      // Handle specific error for email already in use
      if (error.code === "auth/email-already-in-use") {
        return setFormMessage("fails"); // Set failure message
      }
    }
    reset(); // Reset the form fields
  };

  // Regular expression pattern to validate names (only letters and spaces allowed)
  const namePattern = /^[a-zA-Z\s]+$/;
  // Regular expression pattern to validate email addresses
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Regular expression pattern to validate passwords (minimum 8 characters, at least one letter and one number)
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // Render the registration form with input fields, validation, and messages
  return (
    <>
      <Box component="div">
        <Typography
          variant="h1"
          sx={{
            color: "var(--primary-text)",
            fontSize: { xs: "2rem", md: "3rem" },
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Registration!
        </Typography>
        {/**Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/**Name input */}
          <FormControl fullWidth margin="normal">
            <TextField
              type="text"
              variant="filled"
              label="name"
              placeholder="John Doe"
              {...register("name", {
                required: "This field is required",
                pattern: {
                  value: namePattern,
                  message: "Invalid name",
                },
              })}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "var(--input-bg-color)",
                  color: "var(--secondary-text)",
                  fontFamily: "Poppins, sans-serif",
                },
                "& input::placeholder": {
                  color: "var(--secondary-text)",
                  opacity: 1,
                  fontFamily: "Poppins, sans-serif",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--secondary-text)",
                  fontFamily: "Poppins, sans-serif",
                },
              }}
            />
            <Typography variant="body2" color="error">
              {errors.name && errors.name.message}
            </Typography>
          </FormControl>
          {/**Email input */}
          <FormControl fullWidth margin="normal">
            <TextField
              type="email"
              variant="filled"
              label="email"
              placeholder="example@mail.com"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: emailPattern,
                  message: "Invalid email",
                },
              })}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "var(--input-bg-color)",
                  color: "var(--secondary-text)",
                  fontFamily: "Poppins, sans-serif",
                },
                "& input::placeholder": {
                  color: "var(--secondary-text)",
                  opacity: 1,
                  fontFamily: "Poppins, sans-serif",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--secondary-text)",
                  fontFamily: "Poppins, sans-serif",
                },
              }}
            />
            <Typography variant="body2" color="error">
              {errors.email && errors.email.message}
            </Typography>
          </FormControl>
          {/**Password input */}
          <FormControl fullWidth margin="normal">
            <TextField
              type={showPassword ? "text" : "password"}
              variant="filled"
              label="password"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: passwordPattern,
                  message: "Must be 8 chracters with letters and numbers",
                },
              })}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "var(--input-bg-color)",
                  color: "var(--secondary-text)",
                  fontFamily: "Poppins, sans-serif",
                },
                "& input::placeholder": {
                  color: "var(--secondary-text)",
                  opacity: 1,
                  fontFamily: "Poppins, sans-serif",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--secondary-text)",
                  fontFamily: "Poppins, sans-serif",
                },
              }}
            />
            <Typography variant="body2" color="error">
              {errors.password && errors.password.message}
            </Typography>
            <VisibilityPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </FormControl>
          {/**Button submit */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "var(--highlight-color)",
              color: "var(--primary-text)",
              fontSize: { xs: "0.8rem" },
              padding: "0.5rem ",
              borderRadius: "4px",
              fontFamily: "Poppins, sans-serif",
              transform: "scaleX(1)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scaleX(0.96)",
              },
              marginX: 0,
            }}
          >
            Register
          </Button>
          {/**render message if form success or failed */}
          {formMessage === "success" && (
            <Typography
              variant="body2"
              color="success"
              marginY={"10px"}
              display={"flex"}
              justifyContent={"start"}
              alignItems={"end"}
              gap={"8px"}
            >
              <CheckCircleOutlineIcon /> Successfuly registration
            </Typography>
          )}
          {formMessage === "fails" && (
            <Typography
              variant="body2"
              color="error"
              marginY={"10px"}
              display={"flex"}
              justifyContent={"start"}
              alignItems={"end"}
              gap={"8px"}
            >
              <WarningAmberIcon /> Email already in use
            </Typography>
          )}

          <Typography
            variant="body1"
            sx={{
              color: "var(--secondary-text)",
              textAlign: "center",
              marginTop: "1rem",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            - have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--highlight-color)",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Log in
            </Link>{" "}
            -
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default RegisterForm;
