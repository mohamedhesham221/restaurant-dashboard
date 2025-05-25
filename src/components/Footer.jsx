import * as React from "react";
import {
	Container,
	List,
	ListItem,
	Tooltip,
	Typography,
	Box,
	IconButton,
	Stack,
	Divider
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

// Social media links configuration
const FooterLinks = [
	{
		label: "Facebook",
		icon: <FacebookIcon />,
		url: "https://www.facebook.com/",
	},
	{
		label: "Instagram",
		icon: <InstagramIcon />,
		url: "https://www.instagram.com/",
	},
	{
		label: "LinkedIn",
		icon: <LinkedInIcon />,
		url: "https://www.linkedin.com/",
	},
	{
		label: "X",
		icon: <XIcon />,
		url: "https://twitter.com/",
	},
];
//Navigation links configuration
const UserLinks = [
	{ label: "About Us", to: "/about", isExternal: false },
	{ label: "Contact Us", to: "/contact", isExternal: false },
	{ label: "Privacy Policy", to: "https://www.example.com/", isExternal: true },
	{
		label: "Terms of Service",
		to: "https://www.example.com/",
		isExternal: true,
	},
];
// Location and contact information
const LocationInfo = {
	address: "123 Culinary Street, Foodville, FC 12345",
	phone: "+1 (555) 123-4567",
	email: "hello@butcha.com",
	mapLink: "https://maps.google.com/?q=123+Culinary+Street+Foodville",
};
const reasons = [
	"Fresh Ingredients Only",
	"Authentic Recipes & Bold Flavors",
	"Warm & Cozy Atmosphere",
	"Fast & Friendly Service",
];
// Footer component definition
const Footer = () => {
	return (
		<>
			<Divider
				orientation="horizontal"
				sx={{
					marginTop: "2rem",
					width: "100%",
					borderBottom: "4px dashed #10181B",
					backgroundColor: "transparent",
					height: "4px",
				}}
			/>
			<Box component="footer" sx={{ mt: 4, pt: 2 }}>
				<Container
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						justifyContent: "space-between",
						alignItems: "start",
						gap: 5,
					}}
				>
					{/* SECTION 1: Company Information & Social Links */}
					<Box
						component="div"
						sx={{
							display: "flex",
							alignItems: "start",
							flexDirection: "column",
							gap: 2,
							width: { xs: "100%", md: "25%" },
						}}
					>
						{/* Company Logo */}
						<Box
							component="img"
							src={Logo}
							alt="Logo"
							sx={{
								mr: 1,
								height: 50,
							}}
						/>
						{/* Company Description */}
						<Typography
							variant="body2"
							color="var(--secondary-text)"
							fontFamily="var(--font)"
						>
							where carnivores delight in premium cuts, expertly grilled to
							perfection in a warm, rustic atmosphere. Reservations are highly
							recommended to secure your table, especially during busy dinner
							hours and weekends.
						</Typography>
						{/* Social Media Links */}
						<List sx={{ display: "flex" }}>
							{FooterLinks.map((link) => (
								<ListItem key={link.label} sx={{ display: "inline" }}>
									<Tooltip title={link.label} arrow>
										<IconButton>
											<a
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												style={{
													textDecoration: "none",
													color: "var(--highlight-color)",
												}}
											>
												{link.icon}
											</a>
										</IconButton>
									</Tooltip>
								</ListItem>
							))}
						</List>
					</Box>
					{/* SECTION 2: Restaurant Hours */}
					<Box
						component="div"
						sx={{
							display: "flex",
							alignItems: "start",
							flexDirection: "column",
							gap: 1,
							width: { xs: "100%", md: "25%" },
						}}
					>
						{/* Restaurant Opening Hours */}
						<Typography
							variant="body1"
							color="var(--primary-text)"
							fontFamily="var(--font)"
						>
							Why Choose Us?
						</Typography>
						<Stack direction={"column"} spacing={1.5}>
							{reasons.map((reason, index) => (
								<Typography
									variant="body2"
									color="var(--secondary-text)"
									fontFamily="var(--font)"
									key={index}
								>
									{reason}
								</Typography>
							))}
						</Stack>
					</Box>
					{/* SECTION 3: Useful Links */}
					<Box
						component="div"
						sx={{
							display: "flex",
							alignItems: "start",
							flexDirection: "column",
							width: { xs: "100%", md: "25%" },
						}}
					>
						{/* Navigation Links */}
						<Typography
							variant="body1"
							color="var(--primary-text)"
							fontFamily="var(--font)"
						>
							User links
						</Typography>
						<List
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
								listStyleType: "none",
							}}
						>
							{UserLinks.map((link) => (
								<ListItem key={link.label} sx={{ padding: 0 }}>
									{/* External or Internal Links */}
									{link.isExternal ? (
										<Box
											component="a"
											href={link.to}
											target="_blank"
											rel="noopener noreferrer"
											sx={{
												textDecoration: "none",
												color: "var(--secondary-text)",
												fontFamily: "var(--font)",
												"&:hover": {
													color: "var(--highlight-color)",
												},
											}}
										>
											{link.label}
										</Box>
									) : (
										<Box
											component={Link}
											to={link.to}
											sx={{
												textDecoration: "none",
												fontFamily: "var(--font)",
												color: "var(--secondary-text)",
												"&:hover": {
													color: "var(--highlight-color)",
												},
											}}
										>
											{link.label}
										</Box>
									)}
								</ListItem>
							))}
						</List>
					</Box>
					{/* SECTION 4: Location & Contact Information */}
					<Box
						component="div"
						sx={{
							display: "flex",
							alignItems: "start",
							flexDirection: "column",
							width: { xs: "100%", md: "25%" },
						}}
					>
						{/* Location and Contact Details */}
						<Typography
							variant="body1"
							color="var(--primary-text)"
							fontWeight="bold"
							fontFamily="var(--font)"
						>
							Location & Contact
						</Typography>
						<List
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 1,
								pl: 0,
							}}
						>
							{/* Address */}
							<ListItem
								sx={{
									padding: 0,
									display: "flex",
									gap: 1,
									alignItems: "center",
								}}
							>
								<LocationOnIcon
									fontSize="small"
									sx={{
										color: "var(--secondary-text)",
										"&:hover": {
											color: "var(--highlight-color)",
										},
									}}
								/>
								<Box
									component="a"
									href={LocationInfo.mapLink}
									target="_blank"
									rel="noopener noreferrer"
									sx={{
										textDecoration: "none",
										color: "var(--secondary-text)",
										fontFamily: "var(--font)",
										"&:hover": {
											color: "var(--highlight-color)",
										},
									}}
								>
									{LocationInfo.address}
								</Box>
							</ListItem>
							{/* Phone */}
							<ListItem
								sx={{
									padding: 0,
									display: "flex",
									gap: 1,
									alignItems: "center",
								}}
							>
								<PhoneIcon
									fontSize="small"
									sx={{
										color: "var(--secondary-text)",
										"&:hover": {
											color: "var(--highlight-color)",
										},
									}}
								/>
								<Box
									component="a"
									href={`tel:${LocationInfo.phone}`}
									sx={{
										textDecoration: "none",
										color: "var(--secondary-text)",
										fontFamily: "var(--font)",
										"&:hover": {
											color: "var(--highlight-color)",
										},
									}}
								>
									{LocationInfo.phone}
								</Box>
							</ListItem>
							{/* Email */}
							<ListItem
								sx={{
									padding: 0,
									display: "flex",
									gap: 1,
									alignItems: "center",
								}}
							>
								<EmailIcon
									fontSize="small"
									sx={{
										color: "var(--secondary-text)",
										"&:hover": {
											color: "var(--highlight-color)",
										},
									}}
								/>
								<Box
									component="a"
									href={`mailto:${LocationInfo.email}`}
									sx={{
										textDecoration: "none",
										color: "var(--secondary-text)",
										fontFamily: "var(--font)",
										"&:hover": {
											color: "var(--highlight-color)",
										},
									}}
								>
									{LocationInfo.email}
								</Box>
							</ListItem>
						</List>
					</Box>
				</Container>
				{/* Copyright Section */}
				<Box
					component="div"
					sx={{ textAlign: "center", padding: 2, width: "100%", backgroundColor: "#10181B" }}
				>
					<Typography
						variant="body1"
						color="var(--secondary-text)"
						fontFamily="var(--font)"
					>
						&copy; {new Date().getFullYear()} Butcha. All rights reserved.
					</Typography>
				</Box>
			</Box>
		</>
	);
};

export default Footer;
