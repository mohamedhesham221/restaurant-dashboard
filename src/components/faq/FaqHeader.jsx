import * as React from 'react';
import { Typography, Stack } from "@mui/material";

const FaqHeader = () => {
  return (
    <>
            <Stack
              direction="column"
              spacing={2}
              
              sx={{
                alignItems: "center",
                marginBottom: "50px"
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "var(--primary-text)",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontFamily: "var(--font)",
                  fontWeight: 700,
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                  textAlign: { xs: "center", sm: "left" },
                }}
                className='focus-in-contract-bck'
              >
                FAQ{" "}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "var(--secondary-text)",
                  fontSize: { xs: "0.8rem", sm: "1.1rem" },
                  fontFamily: "var(--font)",
                  textAlign: "center",
                }}
              >
               Find quick answers to our most common questions about meat quality, service options, and how we grill!
              </Typography>
            </Stack>
      
    </>
  );
};

export default FaqHeader;