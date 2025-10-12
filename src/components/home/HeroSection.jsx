import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import images from "../../utils/images";
import { useNavigate } from "react-router-dom";
import TextFade from "../animations/TextFade";
// HeroSection component displays the hero section of the homepage with a background image, overlay, and call-to-action buttons.
const HeroSection = ({ goMenu }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${images.HeroHome})`, // Background image for the hero section
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -2,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: alpha(theme.palette.common.black, 0.6), // Dark overlay for better text visibility
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
              color: "var(--primary-text)", // Text color for the hero section
            }}
          >
            <TextFade direction="up" staggerChildren={2} isOnce={true}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  fontSize: {
                    xs: "3rem",
                    sm: "4rem",
                    md: "5rem",
                  },
                  fontFamily: "var(--font)", // Custom font for the heading
                }}
              >
                Crafting Memorable Meals
              </Typography>
            </TextFade>
            <Stack direction="row" justifyContent={"center"} spacing={2}>
              <Button
                variant="outlined"
                color="var(--primary-text)"
                size="medium"
                fontFamily="var(--font)"
                onClick={() => navigate("./reservation")}
                sx={{
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                BOOK A TABLE
              </Button>
              <Button
                variant="text"
                color="var(--primary-text)"
                size="medium"
                fontFamily="var(--font)"
                onClick={goMenu}
                sx={{
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                OPEN MENU
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
