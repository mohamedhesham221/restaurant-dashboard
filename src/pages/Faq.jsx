import * as React from "react";
import Layout from "../layouts/layout";
import { Container } from "@mui/material";
import FaqHeader from "../components/faq/FaqHeader";
import FaqAccordion from "../components/faq/FaqAccordion";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const Faq = () => {
	return (
		<>
			<PageMeta
				title={metaData.faq.title}
				description={metaData.faq.description}
			/>
			<Layout>
				<Container maxWidth="lg" sx={{ padding: "2rem" }}>
					<FaqHeader />
					<FaqAccordion />
				</Container>
			</Layout>
		</>
	);
};

export default Faq;
