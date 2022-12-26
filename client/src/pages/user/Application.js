import React from "react";
import Application from "../../components/user/Application/Application";
import Header from "../../components/user/Header/Header";
import { compRegister } from "../../urls/urls";

function ApplicationPage() {
  return (
    <>
      <Header />
      <Application url={compRegister} />
    </>
  );
}

export default ApplicationPage;
