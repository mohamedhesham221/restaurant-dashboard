import * as React from "react";
import { Container, Stack, Typography } from "@mui/material";
import Layout from "../layouts/layout";
import { CustomerForm, CustomerOrder } from "../components/customer";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

// This component renders the Customer Data page, including metadata, layout, and customer-related components.
const CustomerData = () => {
	return (
		<>
			{/* Page metadata for SEO purposes */}
			<PageMeta
				title={metaData.customerInfo.title}
				description={metaData.customerInfo.description}
			/>
			{/* Main layout wrapper */}
			<Layout>
				<Container>
					{/* Page title */}
					<Typography
						variant="h1"
						fontSize={{ xs: "1rem", md: "2rem" }}
						color="var(--primary-text)"
						marginTop={5}
						marginBottom={3}
					>
						Customer Information
					</Typography>
					{/* Stack containing the customer form and order components */}
					<Stack direction={{ xs: "column" }} spacing={4}>
						<CustomerForm />
						<CustomerOrder />
					</Stack>
				</Container>
			</Layout>
		</>
	);
};

export default CustomerData;
