import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100vh",
					position: "absolute",
					top:"0",
					left: "0",
					zIndex: "9999",
					backgroundColor: "var(--bg-color)",
				}}
			>
				<CircularProgress />
			</Box>
		</>
	);
};

export default Loading;
