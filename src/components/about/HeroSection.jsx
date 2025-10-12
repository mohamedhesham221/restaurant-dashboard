import * as React from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  Button,
  ButtonGroup,
  useTheme,
  alpha,
} from "@mui/material";
import images from "../../utils/images";
import { useNavigate } from "react-router-dom";

// HeroSection component displays a full-screen section with a background image, overlay, and content
const HeroSection = () => {
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
            backgroundImage: `url(${images.HeroAbout})`,
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
            backgroundColor: alpha(theme.palette.common.black, 0.6), //
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ padding: "2rem", marginTop: "-100px" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={6}
            justifyContent="space-between"
            alignItems="center"
            marginTop={{ xs: "150px" }}
          >
            {/* Left section with text and buttons */}
            <Stack
              direction="column"
              spacing={2}
              alignItems="start"
              justifyContent="center"
            >
              <Typography
                variant="body2"
                sx={{
                  color: "var(--primary-text)",
                  fontFamily: "var(--font)",
                  "&::after": {
                    content: '""',
                    display: "block",
                    width: "50px",
                    height: "2px",
                    backgroundColor: "var(--highlight-color)",
                    margin: "0.5rem 0",
                  },
                }}
              >
                RESERVATION
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  color: "var(--primary-text)",
                  fontSize: { xs: "2rem", md: "3.5rem" },
                  lineHeight: { xs: "1.5rem", md: "2.5rem", lg: "3.5rem" },
                  fontWeight: "bold",
                  textAlign: "left",
                  fontFamily: "var(--font)",
                }}
              >
                Working Hours
              </Typography>
              <ButtonGroup>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "var(--highlight-color)",
                    color: "var(--primary-text)",
                    fontSize: { xs: "0.8rem", md: "1rem" },
                    padding: "0.5rem 1rem",
                    fontFamily: "var(--font)",
                    "&:hover": {
                      color: "var(--highlight-color)",
                      backgroundColor: "var(--primary-text)",
                    },
                    marginX: 0,
                  }}
                  onClick={() => navigate("/reservation")}
                >
                  BOOK A TABLE
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "var(--primary-text)",
                    fontFamily: "var(--font)",
                    "&:hover": {
                      color: "var(--highlight-color)",
                      backgroundColor: "var(--primary-text)",
                    },
                  }}
                  onClick={() => navigate("/contact")}
                >
                  CONTACT US
                </Button>
              </ButtonGroup>
            </Stack>
            {/* Right section with working hours */}
            <Box
              component="div"
              sx={{
                width: { xs: "100%", sm: "400px" },
                textAlign: "center",
              }}
              className="magicpattern"
            >
              <Stack
                direction="column"
                spacing={{ xs: 3, md: 6 }}
                sx={{ padding: "2rem" }}
              >
                {/* Working hours for Saturday to Wednesday */}
                <Stack direction="column" >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--primary-text)",
                      fontWeight: "700",
                      fontFamily: "var(--font)",
                      fontSize: "1.5rem",
                    }}
                  >
                    Visit Us:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--primary-text)",
                      fontWeight: "600",
                      fontFamily: "var(--font)",
                    }}
                  >
                    From
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#182F31",
                      fontFamily: "var(--font)",
                      fontSize: { xs: "1.2rem", md: "2rem" },
                    }}
                  >
                    12:00 PM
                  </Typography>
                </Stack>
                {/* Working hours for Wednesday to Thursday */}
                <Stack direction="column" >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--primary-text)",
                      fontWeight: "600",
                      fontFamily: "var(--font)",
                    }}
                  >
                    To
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#182F31",
                      fontFamily: "var(--font)",
                      fontSize: { xs: "1.2rem", md: "2rem" },
                    }}
                  >
                    00.00 AM
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default HeroSection;
