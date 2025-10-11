import * as React from "react";
import { Box, Typography } from "@mui/material";
import RegistrationLayout from "../layouts/registrationLayout";
import PageMeta from "../components/PageMeta";
import { metaData } from "../utils/metaData";
import { ForgotPassForm, ForgotPassImg } from "../components/login";
const ForgotPassword = () => {
  return (
    <>
      <PageMeta
        title={metaData.forgotPassword.title}
        description={metaData.forgotPassword.description}
      />
      <RegistrationLayout>
            <ForgotPassImg />
            <ForgotPassForm />
      </RegistrationLayout>
    </>
  );
};

export default ForgotPassword;
