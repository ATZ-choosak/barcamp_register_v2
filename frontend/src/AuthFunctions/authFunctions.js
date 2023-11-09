import config from "../../config";

const Login = () => {
  window.open(`${config.apiPrefix}/auth/google`, "_self");
};

const Logout = () => {
  window.open(`${config.apiPrefix}/auth/logout`, "_self");
};

const saveForm = async (data) => {
  try {
    let res = await fetch(`${config.apiPrefix}/api/register`, {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    return error.errors;
  }
};

const uploadSlip = async (data) => {
  try {
    let res = await fetch(`${config.apiPrefix}/api/slip`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "multipart/form-data",
        "Access-Control-Allow-Credentials": true,
      },
      body: data,
    });

    return await res.json();
  } catch (error) {
    return error.errors;
  }
};

export { Login, Logout, saveForm, uploadSlip };
