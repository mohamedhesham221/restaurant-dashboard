import React from "react";
import {
  Typography,
  Button,
  Box,
  FormControl,
  TextField,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useForm } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassForm = () => {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  /**
   * React Hook Form setup for form handling and validation
   */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });
  /** Form submission handler */
  const onSubmit = async (data) => {
    const { email } = data;
    // Handle password reset logic here
    const auth = getAuth();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      reset();
      setError(null);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setSuccess(true);
      } else {
        console.error("Firebase reset error:", error);
        setError(error.message);
      }
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 5000);
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 6 seconds
      }, 6000);
    }
  };
  return (
    <>
      <Box component="div">
        <Typography
          variant="h1"
          sx={{
            color: "var(--primary-text)",
            fontSize: { xs: "2rem", md: "3rem" },
            fontFamily: "var(--font)",
          }}
        >
          Forgot Password?
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column" }}
        >
          {/* Email input field */}
          <FormControl fullWidth margin="normal">
            <TextField
              id="email"
              type="email"
              variant="filled"
              label="email"
              placeholder="example@mail.com"
              error={!!errors.email}
              {...register("email", {
                required: "This field is required",
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
          </FormControl>
          {/* Email error message */}
          {errors.email && (
            <Typography color="error" variant="body2">
              {errors.email.message}
            </Typography>
          )}
          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
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
            {loading ? "Sending..." : "Reset Password"}
          </Button>
        </Box>
      </Box>
      {/* Success message */}
      {success && (
        <Alert
          severity="success"
          icon={<CheckIcon fontSize="inherit" />}
          sx={{
            mt: 2,
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "fit-content",
          }}
        >
          Password reset email sent successfully!
        </Alert>
      )}
      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default ForgotPassForm;
