import React from 'react'
import { Box } from "@mui/material";

const AuthImg = ({src, alt}) => {
  return (
    <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          display: { xs: "none", md: "block" },
          width: "50%",
        }}
      />
  )
}

export default AuthImg