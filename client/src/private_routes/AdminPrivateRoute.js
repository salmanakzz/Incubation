import React, { useLayoutEffect, useState } from "react";

import Axios from "../axios/axios";
import TokenCheck from "./TokenCheck";

function AdminPrivateRoutes({ authUrl }) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(false);

  useLayoutEffect(() => {
    Axios.get(authUrl, {
      headers: {
        "x-accesss-token": localStorage.getItem("adminToken"),
      },
    }).then(({ data }) => {
      if (data.admin && data.auth) {
        setToken(true);
        setAuth(true);
        return;
      }
      setAuth(true);
    });
  }, [authUrl]);

  return auth && <TokenCheck tokenParam={token} user={false} />;
}

export default AdminPrivateRoutes;
