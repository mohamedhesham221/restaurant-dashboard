import * as React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoProvider, useDemoRouter } from "@toolpad/core/internal";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MealsTable from "./meals/MealsTable";
import Overview from "./overview/Overview";
import OrdersTable from "./orders/OrdersTable";
import ReservationsTable from "./reservations/ReservationsTable";
import StuffTable from "./stuff/StuffTable";
import InventoryTable from "./inventory/InventoryTable";
import { useQuery } from "@tanstack/react-query";
import { logOutUser, getCurrentUser } from "../../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname.startsWith("/") ? (
        pathname.startsWith("/meals") ? (
          <MealsTable />
        ) : pathname.startsWith("/orders") ? (
          <OrdersTable />
        ) : pathname.startsWith("/reservations") ? (
          <ReservationsTable />
        ) : pathname.startsWith("/inventory") ? (
          <InventoryTable />
        ) : pathname.startsWith("/stuff") ? (
          <StuffTable />
        ) : (
          <Overview />
        )
      ) : null}
    </Box>
  );
}

DemoPageContent.propTypes = {
  navigate: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutPattern() {
  const router = useDemoRouter("/dashboard");
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  if (isLoading) console.log("Loading . . .");
  if (isError) console.error("Failed fetch");

  // Demo user session
  const demoSession = {
    user: {
      name: user?.displayName,
      email: user?.email,
      // or use a placeholder
    },
  };

  // Authentication handlers
  const authentication = React.useMemo(() => {
    return {
      signOut: () => {
        logOutUser()
          .then(() => {
            navigate("/login");
          })
          .catch((error) => console.error(error));
      },
    };
  }, [navigate]);
  // Handler to go back to main website
  const handleGoHome = () => {
    window.location.href = "/"; // Navigate to main website home
  };

  return (
    <DemoProvider>
      <AppProvider
        navigation={[
          {
            kind: "header",
            title: (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={handleGoHome}
                  size="small"
                  sx={{
                    color: "inherit",
                    textTransform: "none",
                    marginTop: "10px",
                    fontFamily: "var(--font)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Back to Website
                </Button>
              </Box>
            ),
            icon: <ArrowBackIosIcon />,
          },
          {
            kind: "divider",
          },
          {
            segment: "",
            title: "Overview",
            icon: <DashboardIcon />,
          },
          {
            segment: "meals",
            title: "Meals",
            icon: <RestaurantMenuIcon />,
          },
          {
            segment: "orders",
            title: "Orders",
            icon: <ShoppingCartIcon />,
          },
          {
            segment: "reservations",
            title: "Reservations",
            icon: <CalendarMonthIcon />,
          },
		  {
            segment: "stuff",
            title: "Stuff",
            icon: <PeopleAltIcon />,
          },
		  {
            segment: "inventory",
            title: "Inventory",
            icon: <InventoryIcon />,
          }
        ]}
        router={router}
        theme={demoTheme}
        branding={{
          title: (
            <Typography
              variant="body1"
              sx={{
                color: "var(--highlight-color)",
                fontWeight: 600,
                fontFamily: "var(--font)",
              }}
            >
              Restaurant Dashboard
            </Typography>
          ),
          logo: "",
        }}
        session={demoSession}
        authentication={authentication}
      >
        <DashboardLayout>
          <DemoPageContent
            pathname={router.pathname}
            navigate={router.navigate}
          />
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

export default DashboardLayoutPattern;
