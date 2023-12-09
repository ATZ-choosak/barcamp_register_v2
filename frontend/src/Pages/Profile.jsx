import React from "react";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Qualified from "../Components/Qualified";
import Confirmed from "../Components/Confirmed";
import NotQualified from "../Components/NotQualified";
import Pending from "../Components/Pending";
import AppBar from "../Components/AppBar";

function Profile() {
  const userload = useLoaderData();
  const navigate = useNavigate();

  const backToForm = () => {
    navigate("/form");
  };

  return (
    <React.Fragment>
      <AppBar />
      <div className="container mx-auto max-w-xl">
        <div className="flex flex-col items-center space-y-5 pt-24 p-4">
          <img
            src={userload.infomation.photos[0].value}
            className="w-24 h-24 object-cover rounded-full shadow-md"
          />

          {userload.user.status === "QUALIFIED" ? (
            <Qualified user={userload.user} />
          ) : userload.user.status === "CONFIRMED" ? (
            <Confirmed user={userload.user} />
          ) : userload.user.status === "NOT_QUALIFIED" ? (
            <NotQualified />
          ) : (
            <Pending />
          )}

          {userload.editable && userload.user.status === "PENDING" ? (
            <button
              onClick={backToForm}
              className="text-white bg-primary-500 p-2 rounded-lg w-full"
            >
              แก้ไขข้อมูลการสมัคร
            </button>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
