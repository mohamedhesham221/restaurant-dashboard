import * as React from "react";
import { Box, Stack } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
const statisticsList = [
  {
    title: "Total Menus",
    value: "140",
    icon: <MenuBookIcon />,
    trending: "up",
    percent: "3%",
  },
  {
    title: "Total Customers",
    value: "200",
    icon: <PeopleIcon />,
    trending: "down",
    percent: "5%",
  },
  {
    title: "Total Orders",
    value: "150",
    icon: <RestaurantMenuIcon />,
    trending: "down",
    percent: "2%",
  },
  {
    title: "Total Revenue",
    value: "$1200",
    icon: <AttachMoneyIcon />,
    trending: "up",
    percent: "10%",
  },
];
const Statistics = () => {
  return (
    <>
      {statisticsList.map((stat, index) => (
        <Box
          component="div"
          key={index}
          sx={{
            marginBottom: "1rem",
            backgroundColor: "#f2f2f2",
            transition: "background-color 0.3s ease",
            color: "#333",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#333",
              color: "#f2f2f2",
            },
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Stack
            direction="column"
            alignItems="left"
            sx={{ minWidth: "250px", padding: "1rem" }}
          >
            <span style={{ textAlign: "start" }}>{stat.icon}</span>
            <Box
              component="strong"
              sx={{ fontFamily: "var(--font)", textAlign: "start" }}
            >
              {stat.title}
            </Box>
          </Stack>
          <Box
            component="span"
            sx={{
              fontFamily: "var(--font)",
              textAlign: "start",
              fontSize: {
                xs: "1.8rem",
                md: "2.8rem",
                lg: "3rem",
              },
              fontWeight: "bold",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            {stat.value}
            <Box component="span">
              {stat.trending === "up" ? (
                <TrendingUpIcon fontSize="small" color="success" />
              ) : (
                <TrendingDownIcon fontSize="small" color="error" />
              )}
              <Box
                component="span"
                sx={{ marginLeft: "0.2rem" }}
                color={stat.trending === "up" ? "success.main" : "error.main"}
              >
                {stat.percent}
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
export default Statistics;
