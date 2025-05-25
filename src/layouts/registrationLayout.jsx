import * as React from "react";
import {
  Container,
  Stack,
} from "@mui/material";

const registrationLayout = ({children}) => {
	return (
		<>
			<Container maxWidth="lg" sx={{ padding: "2rem" }}>
				<Stack direction={{ xs: "column", md: "row" }} spacing={"25px"} justifyContent={"center"} alignItems={"center"}>
          {children}
        </Stack>
			</Container>
		</>
	);
};

export default registrationLayout;
