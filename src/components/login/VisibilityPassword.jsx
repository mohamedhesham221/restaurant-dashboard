import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button} from "@mui/material";

const VisibilityPassword = ({ showPassword, setShowPassword }) => {
  return (
    <Button
      onClick={() => setShowPassword(!showPassword)}
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--secondary-text)",
      }}
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </Button>
  );
};

export default VisibilityPassword;
