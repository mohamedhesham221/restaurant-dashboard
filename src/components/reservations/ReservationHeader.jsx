import * as React from "react";
import {
	Typography,
	Stack,
	List,
	ListItem,
	ListItemText,
	Box,
} from "@mui/material";

const bookingInstructions = [
	{
		primary: "Date and time:",
		secondary: "Select your preferred date and time within our operating hours (Saturday–Tuesday: 9:00 AM–10:00 PM, Wednesday–Thursday: 12:00 PM–12:00 AM).",
	},
	{
		primary: "Your party size",
		secondary: "(up to 10 guests; larger groups, please contact us directly)",
	},
	{
		primary: "Contact details",
		secondary: "Provide your contact details for confirmation.",
	},
	
];
// ReservationHeader component displays the header section for the reservation page,
// including a title, description, booking instructions, and a call-to-action message.
const ReservationHeader = () => {
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          alignItems: "center",
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
        >
          Reservation{" "}
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
          Welcome to{" "}
          <Typography
            variant="body2"
            component="span"
            color="var(--highlight-color)"
            fontWeight="600"
            fontSize="1.5rem"
          >
            Butcha
          </Typography>{" "}
          , where carnivores delight in premium cuts, expertly grilled to
          perfection in a warm, rustic atmosphere. Reservations are highly
          recommended to secure your table, especially during busy dinner hours
          and weekends.
        </Typography>
        <Box component="div" sx={{ textAlign: "start", width: "100%" }}>
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              fontFamily: "var(--font)",
              color: "var(--primary-text)",
              textAlign: "start",
            }}
            variant="h6"
            component="div"
          >
            To book your table:
          </Typography>
          <List sx={{ textAlign: "center" }}>
            {bookingInstructions.map((item, index) => {
              return (
                <ListItem sx={{ color: "var(--secondary-text)" }} key={index}>
                  <ListItemText
                    primary={item.primary}
                    secondary={item.secondary}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontFamily: "var(--font)",
                        fontWeight: 600,
                        color: "var(--highlight-color)",
                      },
                      "& .MuiListItemText-secondary": {
                        fontFamily: "var(--font)",
                        fontWeight: 400,
                        color: "var(--secnodary-text)",
                      },
                    }}
                  />
                </ListItem>
              );
            })}
            ,
          </List>
      <Typography variant="body1" color="var(--secondary-text)" fontSize="1.1rem" fontFamily="var(--font)">Savor the ultimate meat lover’s experience—reserve your table now!</Typography>
        </Box>
      </Stack>
    </>
  );
};

export default ReservationHeader;
