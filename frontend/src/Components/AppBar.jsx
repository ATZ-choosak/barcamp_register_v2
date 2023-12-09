import React from "react";
import { Logout } from "../AuthFunctions/authFunctions";

function AppBar() {
  return (
    <div className="fixed flex items-center justify-between px-10 top-0 z-[1] w-full bg-primary-500 p-2 shadow-md">
      <div className="flex items-center space-x-10 text-white text-lg">
        <img className="w-10" src="logo.png" />
        <p className="text-sm">BARCAMP SONGKHLA</p>
      </div>
      <button onClick={() => Logout()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 fill-white"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default AppBar;
