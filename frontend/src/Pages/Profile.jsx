import React from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Qualified from "../Components/Qualified";
import Confirmed from "../Components/Confirmed";
import NotQualified from "../Components/NotQualified";
import Pending from "../Components/Pending";

function Profile() {
  const userload = useLoaderData();
  const navigate = useNavigate();
  
  const backToForm = () => {
    navigate("/form");
  };

  return (
    <div className="container">
      <img src={userload.infomation.photos[0].value} />
      <p>STATUS : {userload.user.status}</p>

      {userload.user.status === "QUALIFIED" ? (
        <Qualified user={userload.user} />
      ) : userload.user.status === "CONFIRMED" ? (
        <Confirmed user={userload.user} />
      ) : userload.user.status === "NOT_QUALIFIED" ? (
        <NotQualified />
      ) : (
        <Pending />
      )}

      {userload.editable ? (
        <button
          onClick={backToForm}
          className="text-white bg-blue-500 p-2 rounded-lg"
        >
          Edit Informations
        </button>
      ) : null}
    </div>
  );
}

export default Profile;
