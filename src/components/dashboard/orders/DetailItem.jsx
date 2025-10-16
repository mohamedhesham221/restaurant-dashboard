import React from 'react'
import { Stack, Typography, Box } from "@mui/material";

// A reusable component to display an icon, label, and value in a structured format
const DetailItem = ({ icon, label, value }) => (
  <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5} sx={{ minWidth: 200 }}>
    {React.cloneElement(icon, { sx: { color: "var(--highlight-color)", fontSize: 20 } })}
    <Box>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "text.primary", fontFamily: "var(--font)" }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ fontFamily: "var(--font)" }}>
        {value || "—"}
      </Typography>
    </Box>
  </Stack>
);

export default DetailItem