import * as React from 'react';
import images from "../../utils/images";
import AuthImg from "./AuthImg";
const RegisterImg = () => {
  return (
    <>
      <AuthImg src={images.SignUp} alt="user sign up illustration" />
    </>
  );
};

export default RegisterImg;