import * as React from "react";
import { Container, Stack, Box } from "@mui/material";
import Sells from "./Sells";
import BestMeals from "./BestMeals";
import Statistics from "./Statistics";
import RecentOrder from "./RecentOrder";
import LowStockItems from "./LowStockItems";
const Overview = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ padding: "2rem" }}>
        <Stack direction={{ xs: "column" }} spacing={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={1}
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            marginBottom="2rem"
          >
            <Statistics />
          </Stack>
          <Box sx={{ marginBottom: "2rem" }}>
            <Sells />
          </Box>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            justifyContent="space-between"
            marginBottom="2rem"
          >
            <BestMeals />
            <RecentOrder />
          </Stack>
          <LowStockItems />
        </Stack>
      </Container>
    </>
  );
};

export default Overview;
