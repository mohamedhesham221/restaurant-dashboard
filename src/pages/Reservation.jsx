import * as React from "react";
import Layout from "../layouts/layout";
import ReservationHeader from "../components/reservations/ReservationHeader";
import { Container } from "@mui/material";
import ReservationForm from "../components/reservations/ReservationForm";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

// Reservation component that renders the layout, header, and form for reservations
const Reservation = () => {
	return (
		<>
			<PageMeta
				title={metaData.reservations.title}
				description={metaData.reservations.description}
			/>
			<Layout>
				<Container maxWidth="lg" sx={{ padding: "2rem" }}>
					<ReservationHeader />
					<ReservationForm />
				</Container>
			</Layout>
		</>
	);
};

export default Reservation;
