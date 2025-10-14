import * as React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<main style={{overflow: "hidden"}}>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
