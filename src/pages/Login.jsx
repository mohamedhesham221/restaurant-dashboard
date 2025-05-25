import * as React from "react";
import { LoginForm, LoginImg } from "../components/login";
import RegistrationLayout from "../layouts/registrationLayout";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const Login = () => {
	return (
		<>
			<PageMeta
				title={metaData.login.title}
				description={metaData.login.description}
			/>
			<RegistrationLayout>
				<LoginImg />
				<LoginForm />
			</RegistrationLayout>
		</>
	);
};

export default Login;
