import React, { useLayoutEffect, useState } from "react";
import Axios from "../axios/axios";
import TokenCheck from "./TokenCheck";

function UserPrivateRoutes({ authUrl }) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(false);

  useLayoutEffect(() => {
    Axios.get(authUrl, {
      headers: {
        "x-accesss-token": localStorage.getItem("token"),
      },
    }).then(({ data }) => {
      if (data.user && data.auth) {
        setToken(true);
        setAuth(true);
        return;
      }
      setAuth(true);
    });
  }, [authUrl]);

  return auth && <TokenCheck tokenParam={token} user={true} />;
}

export default UserPrivateRoutes;
