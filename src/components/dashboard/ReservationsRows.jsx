import * as React from "react";
import RendeReservationRow from "./RendeReservationRow";
// Component to render a list of reservation rows with filtering functionality
const ReservationsRows = ({
	reservations,
	query,
	styled,
	setFormType,
	setReservationId,
	handleModalOpen,
	setOpenDeleteModal,
	filterQuery,
}) => {

	// Initialize filteredReservations with all reservations
	let filteredReservations = reservations;

	// Filter reservations based on search query or filter criteria
	if (query) {
		// Filter by search query (case-insensitive match on reservation name)
		filteredReservations = reservations.filter((reservation) =>
			reservation.name.toLowerCase().includes(query.toLowerCase())
		);
	} else {
		// Apply filter based on filterQuery value
		switch (filterQuery) {
			case "lessThanOrEqual5":
				// Filter reservations with 5 or fewer guests
				filteredReservations = reservations.filter(
					(reservation) => reservation.guests <= 5
				);
				break;

			case "moreThan5":
				// Filter reservations with more than 5 guests
				filteredReservations = reservations.filter(
					(reservation) => reservation.guests > 5
				);
				break;

			case "12:00 PM to 4:00 PM":
				// Filter reservations between 12:00 PM and 4:00 PM
				filteredReservations = reservations.filter((reservation) => {
					const reservationTime = new Date(`1970-01-01T${reservation.time}:00`);
					return (
						reservationTime >= new Date("1970-01-01T12:00:00") &&
						reservationTime < new Date("1970-01-01T16:00:00")
					);
				});
				break;

			case "4:00 PM to 8:00 PM":
				// Filter reservations between 4:00 PM and 8:00 PM
				filteredReservations = reservations.filter((reservation) => {
					const reservationTime = new Date(`1970-01-01T${reservation.time}:00`);
					return (
						reservationTime >= new Date("1970-01-01T16:00:00") &&
						reservationTime < new Date("1970-01-01T20:00:00")
					);
				});
				break;

			case "8:00 PM to 12:00 AM":
				// Filter reservations between 8:00 PM and 12:00 AM
				filteredReservations = reservations.filter((reservation) => {
					const reservationTime = new Date(`1970-01-01T${reservation.time}:00`);
					return (
						reservationTime >= new Date("1970-01-01T20:00:00") &&
						reservationTime < new Date("1970-01-02T00:00:00")
					);
				});
				break;

			default:
				// No filter applied, use all reservations
				filteredReservations = reservations;
		}
	}

	// Render the filtered list of reservations
	return (
		<>
			{filteredReservations.map((reservation) => (
				<RendeReservationRow
					reservation={reservation}
					styled={styled}
					key={reservation.id}
					setFormType={setFormType}
					setReservationId={setReservationId}
					handleModalOpen={handleModalOpen}
					setOpenDeleteModal={setOpenDeleteModal}
				/>
			))}
		</>
	);
};

export default ReservationsRows;
