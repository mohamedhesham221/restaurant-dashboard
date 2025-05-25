import * as React from "react";
import Layout from "../layouts/layout";
import { HeroSection, FirstSection, SecondSection } from "../components/home";
import { useNavigate } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";
// Home component for the restaurant dashboard
// Includes navigation functionality and renders layout with sections
const Home = () => {
	const navigate = useNavigate();

	// Function to navigate to the menu page
	const goMenu = () => {
		navigate("/menu");
	};

	return (
		<>
			<PageMeta
				title={metaData.home.title}
        description={metaData.home.description}
			/>
			<Layout>
				<HeroSection goMenu={goMenu} />
				<FirstSection />
				<SecondSection goMenu={goMenu} />
			</Layout>
		</>
	);
};

export default Home;
