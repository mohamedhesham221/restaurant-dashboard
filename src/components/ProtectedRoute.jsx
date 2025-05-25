import * as React from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "./Loading";

const ProtectedRoute = () => {
	const [checking, setChecking] = React.useState(true); // Track if we're still checking the user's auth state
	const [user, setUser] = React.useState(""); // Holds the authenticated user (or null)

	React.useEffect(() => {
		const auth = getAuth(); // Get the Firebase auth instance
		const unsub = onAuthStateChanged(auth, (user) => {
			setUser(user); // If a user is logged in, save them to state
			setChecking(false); // We're done checking auth
		});
		return () => unsub();
	}, []);

	if (checking) return <Loading />;
	if (!user) return <Navigate to="/login" replace />;

	return;
};

export default ProtectedRoute;
