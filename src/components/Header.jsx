import * as React from "react";
import Loading from "./Loading";
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  Badge,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser, getCurrentUser } from "../firebase/firebaseAuth";
import { useQuery } from "@tanstack/react-query";
import useOrderStore from "../store/useOrderStore";
import { auth } from "../firebase/firebaseAuth";
import { deepPurple, deepOrange } from "@mui/material/colors";

// Navigation links
const pages = ["Home", "About", "Menu", "Contact", "Reservation", "FAQ"];
// User settings menu items
const settings = [
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
];
const currentUserSettings = ["Logout"];
const adminSettings = ["Dashboard", "Logout"];
// Styled Badge component for cart icon
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));
// Admin email from environment variables
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const Header = () => {
  // Check if the current user is an admin
  const isAdmin = auth.currentUser?.email === ADMIN_EMAIL;

  // Hook for navigation
  const navigate = useNavigate();
  // get the order bag from Zustand store
  const orderBag = useOrderStore((state) => state.orders);

  // State for mobile navigation menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // State for user settings menu
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isUserAuthMenu, setIsUserAuthMenu] = React.useState(false);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  // Handlers for opening and closing menus
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // Handler for closing the mobile navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const toggleNavigationMobileMenu = (event) => {
    setIsOpenMenu(!isOpenMenu);
    if (!isOpenMenu) {
      handleOpenNavMenu(event);
    } else {
      handleCloseNavMenu();
    }
  };
  // Handler for closing the user settings menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // Handler for opening the user settings menu
  const toggleMenu = (event) => {
    setIsUserAuthMenu(!isUserAuthMenu);
    if (!isUserAuthMenu) {
      setAnchorElUser(event.currentTarget);
    } else {
      setAnchorElUser(null);
    }
  };

  // Function to generate route paths based on page names
  const getRoutePath = (pageName) => {
    return `/${pageName === "Home" ? "" : pageName.toLowerCase()}`;
  };
  // Fetch the current user data using React Query
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  // Function to handle user sign-out
  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };
  // Function to navigate to the cart page
  const handleToCart = () => {
    navigate("/cart");
  };
  // Show loading spinner while user data is being fetched
  if (isLoading) return <Loading />;
  if (isError) return console.error("username fetching failed");

  // Render the header component with navigation and user settings
  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--bg-color)",
          position: "relative",
          zIndex: "9999",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Desktop Logo */}
            <Box
              to="/"
              component={Link}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Box
                component="img"
                src={Logo}
                alt="Logo"
                sx={{
                  display: { xs: "none", md: "block" },
                  mr: 1,
                  height: 50,
                }}
              />
            </Box>
            {/* Mobile Menu Icon & Dropdown */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleNavigationMobileMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "var(--highlight-color)" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {/* Mobile Navigation Links */}
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Box
                      sx={{
                        textAlign: "center",
                        textDecoration: "none",
                        color: "var(--bg-color)",
                        fontFamily: "var(--font)",
                      }}
                      component={Link}
                      to={getRoutePath(page)}
                    >
                      {page}
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* Mobile Logo (centered) */}
            <Link to="/">
              <Box
                component="img"
                src={Logo}
                alt="Logo"
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                  height: 50,
                }}
              />
            </Link>
            {/* Desktop Navigation Links */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {pages.map((page) => (
                <Box
                  key={page}
                  component={Link}
                  to={getRoutePath(page)}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textDecoration: "none",
                    fontFamily: "var(--font)",
                    mx: 2,
                    position: "relative",
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "0%",
                      height: "2px",
                      backgroundColor: "var(--highlight-color)",
                      transition: "width 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {page}
                </Box>
              ))}
            </Box>
            {/* User Settings Menu */}
            <Box sx={{ flexGrow: 0 }}>
              {/* Cart Icon */}
              <IconButton aria-label="cart" onClick={handleToCart}>
                <StyledBadge
                  badgeContent={orderBag.length}
                  color="warning"
                  sx={{ mx: 2 }}
                >
                  <ShoppingCartIcon
                    sx={{
                      color: "#fff",
                      fontSize: 30,
                    }}
                  />
                </StyledBadge>
              </IconButton>
              {/* User Avatar or Login Icon */}
              <Tooltip title={user ? user.displayName : "Login or Register"}>
                <IconButton
                  onClick={toggleMenu}
                  sx={{ p: 0 }}
                  aria-label="avatar"
                >
                  {user ? (
                    <Avatar
                      sx={
                        isAdmin
                          ? { bgcolor: deepPurple[500] }
                          : { bgcolor: deepOrange[500] }
                      }
                    >
                      {user?.displayName?.charAt(0)}
                    </Avatar>
                  ) : (
                    <PersonIcon
                      sx={{
                        color: "#fff",
                        fontSize: 30,
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              {/* User Settings Dropdown Menu */}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user && (
                  <Chip
                    avatar={
                      <Avatar>{user.displayName.charAt(0)}</Avatar>
                    }
                    label={`Hello, ${user.displayName}`}
                    color="#182F31"
                    variant="outlined"
                    sx={{ mx: 1, mb: 1 }}
                  />
                )}
                {/* Render admin options if the authenticated user is an admin */}
                {user &&
                  isAdmin &&
                  adminSettings.map((setting) => {
                    if (setting === "Dashboard") {
                      return (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Box
                            component={Link}
                            to="/admin/dashboard"
                            sx={{
                              fontFamily: "var(--font)",
                              textDecoration: "none",
                              color: "#10181B",
                              "&:hover": { color: "var(--highlight-color)" },
                              borderBottom: "1px solid #ccc",
                              width: "100%",
                              pb: 1,
                            }
                          }
                          >
                            {setting}
                          </Box>
                        </MenuItem>
                      );
                    }
                    if (setting === "Logout") {
                      return (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Button
                            variant="contained"
                            sx={{
                              textAlign: "center",
                              backgroundColor: "red",
                              color: "#f2f2f2",
                              "&:hover": { backgroundColor: "darkred" },
                              textTransform: "none",
                            }}
                            onClick={handleSignOut}
                            endIcon={<Logout />}
                          >
                            {setting}
                          </Button>
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                {/* Render logout option for regular authenticated users */}
                {user &&
                  !isAdmin &&
                  currentUserSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Button
                        variant="contained"
                        sx={{
                          textAlign: "center",
                          backgroundColor: "red",
                          color: "#f2f2f2",
                          "&:hover": { backgroundColor: "darkred" },
                          textTransform: "none",
                        }}
                        onClick={handleSignOut}
                        endIcon={<Logout />}
                      >
                        {setting}
                      </Button>
                    </MenuItem>
                  ))}
                {/* Render login/register options if no user is authenticated */}
                {!user &&
                  settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Box
                        component={Link}
                        to={setting.path}
                        sx={{
                          textDecoration: "none",
                          color: "#10181B",
                          "&:hover": { color: "var(--highlight-color)" },
                        }}
                      >
                        {setting.name}
                      </Box>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
