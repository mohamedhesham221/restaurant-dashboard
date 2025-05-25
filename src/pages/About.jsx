import * as React from "react";
import Layout from "../layouts/layout";
import { HeroSection, FirstSection, SecondSection, ThirdSection } from "../components/about";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const About = () => {
	return (
		<>
					<PageMeta
						title={metaData.about.title}
						description={metaData.about.description}
					/>
		
			<Layout>
				<HeroSection />
				<FirstSection />
				<SecondSection />
				<ThirdSection />
			</Layout>
		</>
	);
};

export default About;
