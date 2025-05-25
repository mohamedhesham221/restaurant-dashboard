import * as React from 'react';
import { Box } from "@mui/material";
import images from "../../utils/images";

const RegisterImg = () => {
  return (
    <>
      <Box
				component="img"
				src={images.SignUp}
				alt="user login with computer"
        sx={{
          display: {xs: "none", md: "block"},
          width: "50%"
        }}
			/>
    </>
  );
};

export default RegisterImg;