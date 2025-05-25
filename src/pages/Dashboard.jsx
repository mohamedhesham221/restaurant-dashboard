import * as React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const Dashboard = () => {
	return (
		<>
			<PageMeta
				title={metaData.dashboard.title}
				description={metaData.dashboard.description}
			/>
			<DashboardLayout />
		</>
	);
};

export default Dashboard;
