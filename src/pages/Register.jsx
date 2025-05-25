import * as React from "react";
import { RegsiterForm, RegisterImg } from "../components/login";
import RegistrationLayout from "../layouts/registrationLayout";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";

const Register = () => {
	return (
		<>
			<PageMeta
				title={metaData.register.title}
				description={metaData.register.description}
			/>
			<RegistrationLayout>
				<RegisterImg />
				<RegsiterForm />
			</RegistrationLayout>
		</>
	);
};

export default Register;
