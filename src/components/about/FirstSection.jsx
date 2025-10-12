import * as React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import {
  Box,
  Typography,
  Container,
  Stack,
  Card,
  Rating,
  Divider,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import TextFade from "../animations/TextFade";
import SlideIn from "../animations/SlideIn";
// Array of review objects containing name, description, and rating
const reviews = [
  {
    name: "John Doe",
    description:
      "Every dish was bursting with taste and made with care. You can really tell they use fresh ingredients. I’ll definitely be coming back — everything was just that good!",
    rate: 4.5,
  },

  {
    name: "Jane Smith",
    description:
      "The staff was super friendly and made us feel right at home. Our food came out quickly, and everything was cooked to perfection. Great vibes and even better hospitality.",
    rate: 5,
  },
  {
    name: "Alice Johnson",
    description:
      "From the cozy atmosphere to the creative menu, this place has it all. I even tried one of the chef’s recipe tips at home — and it worked! Can’t wait for my next visit.",
    rate: 4.4,
  },
];
const currentColorHandle = (index) => {
  if (index === 1) {
    return "var(--second-rate-icon-color)";
  } else if (index === 2) {
    return "var(--third-rate-icon-color)";
  } else {
    return "var(--highlight-color)";
  }
};
const FirstSection = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ padding: "2rem" }}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "var(--primary-text)",
              fontSize: { xs: "0.5rem", sm: "1rem" },
              fontFamily: "var(--font)",
              textAlign: "center",
              "&::after": {
                content: '""',
                display: "block",
                width: "50px",
                height: "2px",
                backgroundColor: "var(--highlight-color)",
                margin: "0.5rem auto",
              },
            }}
          >
            REVIEWS
          </Typography>
          <TextFade direction="up" staggerChildren={0.2} isOnce={false}>
            <Typography
              variant="h2"
              sx={{
                color: "var(--primary-text)",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontFamily: "var(--font)",
                fontWeight: 700,
                lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                textAlign: { xs: "center", sm: "left", md: "center" },
              }}
            >
              What Our Guests Are Saying
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "var(--secondary-text)",
                fontSize: "1rem",
                textAlign: "center",
                fontFamily: "var(--font)",
              }}
            >
              Fresh ingredients, bold flavors, and unforgettable service — it’s
              no wonder our customers keep coming back. Here’s what they love
              about dining with us.{" "}
            </Typography>
          </TextFade>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          spacing={6}
          mt={10}
        >
          {reviews.map((review, index) => {
            return (
              <SlideIn index={index} key={index} isOnce={false}>
                <Card
                  sx={{
                    position: "relative",
                    backgroundColor: "var(--card-bg-color)",
                    overflow: "visible",
                  }}
                >
                  <Box
                    sx={{
                      width: "fit-content",
                      height: "fit-content",
                      position: "absolute",
                      top: "-35px",
                      left: "0",
                      right: "0",
                      margin: "0 auto",
                      backgroundColor: "var(--card-bg-color)",
                      boxShadow: "1px 1px 8px var(--bg-color)",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormatQuoteIcon
                      sx={{
                        color: currentColorHandle(index),
                        fontSize: "2rem",
                      }}
                    />
                  </Box>
                  <CardContent sx={{ padding: "2rem", textAlign: "center" }}>
                    <Typography
                      variant="blockquote"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--secondary-text)",
                        lineHeight: 1.5,
                        fontFamily: "var(--font)",
                      }}
                    >
                      {review.description}
                    </Typography>
                    <Rating
                      name="half-rating-read"
                      defaultValue={review.rate}
                      precision={0.5}
                      readOnly
                      sx={{
                        display: "flex",
                        margin: "1rem auto",
                        "& .MuiRating-iconFilled": {
                          color: currentColorHandle(index),
                        },
                        "& .MuiRating-iconEmpty": {
                          color: currentColorHandle(index),
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "var(--primary-text)",
                        lineHeight: 1.5,
                        marginTop: "1rem",
                        fontFamily: "var(--font)",
                      }}
                    >
                      {review.name}
                    </Typography>
                  </CardContent>
                </Card>
              </SlideIn>
            );
          })}
        </Stack>
        <Divider
          orientation="horizontal"
          sx={{
            marginTop: "2rem",
            width: "100%",
            borderBottom: "4px dashed var(--card-bg-color)",
            backgroundColor: "transparent",
            height: "4px",
          }}
        />
      </Container>
    </>
  );
};

export default FirstSection;
