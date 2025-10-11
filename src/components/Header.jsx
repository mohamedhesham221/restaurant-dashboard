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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser, getCurrentUser } from "../firebase/firebaseAuth";
import { useQuery } from "@tanstack/react-query";
import useOrderStore from "../store/useOrderStore";

// Navigation links
const pages = [
  "Home",
  "About",
  "Menu",
  "Contact",
  "Reservation",
  "FAQ",
  "Dashboard",
];
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
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  // get the order bag from Zustand store
  const orderBag = useOrderStore((state) => state.orders);

  // State for mobile navigation menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // State for user settings menu
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // Handlers for opening and closing menus
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // Handler for closing the mobile navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handler for closing the user settings menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // Handler for opening the user settings menu
  const toggleMenu = (event) => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
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
                onClick={handleOpenNavMenu}
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
              <Tooltip title="Register or Login">
                <IconButton
                  onClick={toggleMenu}
                  sx={{ p: 0 }}
                  aria-label="avatar"
                >
                  {user ? (
                    <Avatar>{user?.displayName?.slice(0, 1)}</Avatar>
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
                {/* Render settings based on user authentication */}
                {user
                  ? currentUserSettings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Button
                          sx={{
                            textAlign: "center",
                            backgroundColor: "transparent",
                            color: "#000",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                          onClick={handleSignOut}
                        >
                          {setting}
                        </Button>
                      </MenuItem>
                    ))
                  : settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        onClick={handleCloseUserMenu}
                      >
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
