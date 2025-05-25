import * as React from "react";
import Layout from "../layouts/layout";
import { MenuHeader, MenuList } from "../components/menu";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const Menu = () => {
	return (
		<>
			<PageMeta
				title={metaData.menu.title}
				description={metaData.menu.description}
			/>
			<Layout>
				<MenuHeader />
				<MenuList />
			</Layout>
		</>
	);
};

export default Menu;
