import React from "react";
import Login from "../../components/admin/Login/Login";

function AdminLoginPage({ admin, url }) {
  return <Login admin={admin} url={url} />;
}

export default AdminLoginPage;
