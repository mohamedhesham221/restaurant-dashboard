import * as React from "react";
import RenderMealRow from "./RenderMEalRow";

// Component to render rows of meals based on search query or rating filters

const MealsTableRows = ({
	query,
	meals,
	styled,
	rate,
	setModalType,
	setOpenModal,
	setMealId
}) => {
	// Filter meals based on the search query
	const filteredMeals = meals?.filter((meal) =>
		meal.name.toLowerCase().includes(query.toLowerCase())
	);
	// Filter meals with a rating of 4 or higher
	const filteredTopRatedMeals = meals?.filter((meal) => meal.rate >= 4);
	// Filter meals with a rating below 4
	const filteredLowRatedMeals = meals?.filter((meal) => meal.rate < 4);

	return (
		<>
			{/* Render filtered meals if search query exists */}
			{query
				? filteredMeals.map((meal) => (
						<RenderMealRow
							meal={meal}
							styled={styled}
							key={meal.id}
							setModalType={setModalType}
							setOpenModal={setOpenModal}
							setMealId={setMealId}

						/>
					))
				: rate === "TopRate"
					? // Render meals with a rating of 4 or higher if "TopRate" is selected
						filteredTopRatedMeals.map((meal) => (
							<RenderMealRow
								meal={meal}
								styled={styled}
								key={meal.id}
								setModalType={setModalType}
								setOpenModal={setOpenModal}
								setMealId={setMealId}

							/>
						))
					: rate === "LowRate"
						? // Render meals with a rating below 4 if "LowRate" is selected
							filteredLowRatedMeals.map((meal) => (
								<RenderMealRow
									meal={meal}
									styled={styled}
									key={meal.id}
									setModalType={setModalType}
									setOpenModal={setOpenModal}
									setMealId={setMealId}

								/>
							))
						: // Render all meals if no filters are applied
							meals?.map((meal) => (
								<RenderMealRow
									meal={meal}
									styled={styled}
									key={meal.id}
									setModalType={setModalType}
									setOpenModal={setOpenModal}
									setMealId={setMealId}
								/>
							))}
		</>
	);
};

export default MealsTableRows;
