import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
	Home,
	About,
	Contact,
	Menu,
	NotFound,
	Dashboard,
	Login,
	Register,
	Cart,
	CustomerData,
	Reservation,
	Faq,
} from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {

	const routes = [
		{ path: "/", element: <Home /> },
		{ path: "/about", element: <About /> },
		{ path: "/menu", element: <Menu /> },
		{ path: "/contact", element: <Contact /> },
		{ path: "/reservation", element: <Reservation /> },
		{ path: "faq", element: <Faq /> },
		{ path: "/dashboard", element: <Dashboard /> },
		{ path: "/login", element: <Login /> },
		{ path: "/register", element: <Register /> },
		{ path: "/cart", element: <Cart /> },
		{ path: "/customer", element: <CustomerData /> },
		{ path: "*", element: <NotFound /> },
	];

	return (
		<>
				<Routes>
					{routes.map(({ path, element }, index) => (
						<Route key={index} path={path} element={element} />
					))}
				</Routes>
		</>
	);
}

export default App;
