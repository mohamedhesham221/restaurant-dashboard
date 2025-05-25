import * as React from "react";
import { Container, Stack, Typography } from "@mui/material";
import Layout from "../layouts/layout";
import { CustomerForm, CustomerOrder } from "../components/customer";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const CustomerData = () => {
	return (
		<>
		<PageMeta
						title={metaData.customerInfo.title}
						description={metaData.customerInfo.description}
					/>
			<Layout>
				<Container>
					<Typography
						variant="h1"
						fontSize={{ xs: "1rem", md: "2rem" }}
						color="var(--primary-text)"
						marginTop={5}
						marginBottom={3}
					>
						Customer Information
					</Typography>
					<Stack direction={{ xs: "column",}} spacing={4}>
						<CustomerForm />
						<CustomerOrder />
					</Stack>
				</Container>
			</Layout>
		</>
	);
};

export default CustomerData;
