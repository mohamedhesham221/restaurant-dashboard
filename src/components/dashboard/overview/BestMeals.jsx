import * as React from "react";
import { useMeals } from "../../../hooks/useMeals";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Stack,
} from "@mui/material";
// Component to display the best meals based on their rating and orders
const BestMeals = () => {
  const { data: meals, isLoading } = useMeals(); // Custom hook to fetch meals data

  // Show loading message while data is being fetched
  if (isLoading) return <p>Loading . . .</p>;

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 550, height: 400 }}>
        {/* Title for the Best Dishes section */}
        <Typography
          variant="h4"
          align="left"
          fontFamily="var(--font)"
        >
          Best Dishes
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          align="left"
          color="var(--secondary-text)"
          fontFamily="var(--font)"
        >
          Track the top-performing dishes
        </Typography>
        <Box sx={{ height: 300, overflowY: "auto", p: 1 }} flexGrow={1}>
          {/* Table to display meals */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* Table headers */}
                  <TableCell></TableCell>
                  <TableCell sx={{ fontFamily: "var(--font)" }}>Meal</TableCell>
                  <TableCell align="right" sx={{ fontFamily: "var(--font)" }}>
                    Orders
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Filter meals with a rating greater than 4 and map them to table rows */}
                {meals
                  .filter((meal) => meal.rate >= 4.5)
                  .map((meal) => (
                    <TableRow
                      key={meal.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* Meal details with image and name */}
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          gap: "10px",
                          fontFamily: "var(--font)",
                        }}
                      >
                        <Box
                          component="img"
                          src={meal.img}
                          alt={meal.name}
                          sx={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack direction="column">
                          {/* Meal name */}
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "1rem",
                              fontFamily: "var(--font)",
                            }}
                          >
                            {meal.name}
                          </Typography>
                          {/* Meal price */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "var(--highlight-color)",
                              fontSize: "1.5rem",
                              fontFamily: "var(--font)",
                            }}
                          >
                            ${meal.price}
                          </Typography>
                        </Stack>
                      </TableCell>
                      {/* Number of orders for the meal */}
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "1.5rem",
                            fontFamily: "var(--font)",
                          }}
                        >
                          {meal.ordersCount}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default BestMeals;
