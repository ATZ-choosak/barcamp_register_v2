import React, { useEffect, useState } from "react";
import config from "../config";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch(`${config.apiPrefix}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();

  }, []);

  console.log(user);

  const Googlelogin = () => {
    window.open(`${config.apiPrefix}/auth/google`, "_self");
  };

  const logout = () => {
    window.open(`${config.apiPrefix}/auth/logout`, "_self");
  };

  return (
    <div className="container mx-auto">
      <div className="flex w-full space-y-4 flex-col items-center justify-center mt-10">
        <p className="font-bold text-xl">Wellcome to Barcamp 8</p>
        {user ? (
          <div>
            <p>Email : {user.user.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <button onClick={Googlelogin}>Login</button>
        )}
      </div>
    </div>
  );
}

export default App;
