import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetAllUsers } from "../../AuthFunctions/authFunctions";
import UserCard from "../../Components/UserCard";
import clsx from "clsx";
import { adminUpdateStatus } from "../../AuthFunctions/authFunctions";
import Swal from "sweetalert2";

function AdminConsole() {
  const navigate = useNavigate();

  const [usersLst, setUsersLst] = useState([]);
  const [btnFilter, setBtnFilter] = useState("PENDING");
  const [filter, setFilter] = useState("");
  const [filterPay, setFilterPay] = useState(false);

  const fetch_user = async () => {
    let users = await adminGetAllUsers();
    setUsersLst(users);
  };

  const update_status = async (id, status) => {
    try {
      await adminUpdateStatus({ _id: id, status });
      Swal.fire({
        title: "แจ้งเตือน",
        text: "Update Status เรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "รับทราบ",
        confirmButtonColor: "#FF8C00",
      }).then(() => fetch_user());
    } catch (error) {
      Swal.fire({
        title: "แจ้งเตือน",
        text: error,
        icon: "error",
        confirmButtonText: "รับทราบ",
        confirmButtonColor: "#FF8C00",
      });
    }
  };

  useEffect(() => {
    if (!window.localStorage.getItem("access_token")) {
      navigate("/admin");
    }
    fetch_user();
  }, []);

  useEffect(() => {

    if(btnFilter !== "QUALIFIED"){
      setFilterPay(false)
    }

  },[btnFilter])

  const logout = () => {
    window.localStorage.clear();
    navigate("/admin");
  };

  return (
    <div className="container max-w-lg mx-auto mt-20 relative pt-36 p-4">
      <div className="fixed top-2 right-2">
        <button
          onClick={logout}
          className="bg-red-500 text-white p-2 rounded-lg text-sm"
        >
          LOGOUT
        </button>
      </div>
      <div className="fixed top-2 left-2">
        <p>User Count : {usersLst.length}</p>
      </div>
      <div className="absolute top-0 left-0 w-full p-4">
        <input
          className="bg-white shadow-md outline-none p-4 w-full rounded-lg"
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex items-center justify-around p-2">
          <button
            onClick={() => setBtnFilter("PENDING")}
            className={clsx(
              "p-2",
              btnFilter === "PENDING"
                ? "bg-primary-500 text-white rounded-md"
                : "p-2"
            )}
          >
            PENDING
          </button>
          <button
            onClick={() => setBtnFilter("QUALIFIED")}
            className={clsx(
              "p-2",
              btnFilter === "QUALIFIED"
                ? "bg-primary-500 text-white rounded-md"
                : "p-2"
            )}
          >
            QUALIFIED
          </button>
          <button
            onClick={() => setBtnFilter("CONFIRMED")}
            className={clsx(
              "p-2",
              btnFilter === "CONFIRMED"
                ? "bg-primary-500 text-white rounded-md"
                : "p-2"
            )}
          >
            CONFIRMED
          </button>
          <button
            onClick={() => setBtnFilter("NOT_QUALIFIED")}
            className={clsx(
              "p-2",
              btnFilter === "NOT_QUALIFIED"
                ? "bg-primary-500 text-white rounded-md"
                : "p-2"
            )}
          >
            NOT_QUALIFIED
          </button>
        </div>
      </div>
      <div className={clsx(btnFilter === "QUALIFIED" ? "block" : "hidden")}>
        <button
          onClick={() => setFilterPay((pre) => !pre)}
          className={clsx(
            "w-full p-2 mb-5 text-white rounded-md",
            filterPay ? "bg-primary-600" : "bg-primary-500"
          )}
        >
          จ่ายแล้ว
        </button>
      </div>
      <div className="space-y-5">
        {usersLst
          .filter((user) => user.firstName !== "")
          .filter((user) => user.status === btnFilter)
          .filter((user) =>
            filter
              ? user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
                user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
                user.email.toLowerCase().includes(filter.toLowerCase()) ||
                user.phoneNumber.includes(filter)
              : user
          )
          .filter((user) => filterPay ? user.slip !== "" : user)
          .map((data, i) => (
            <UserCard user={data} key={i} update_status={update_status} />
          ))}
      </div>
    </div>
  );
}

export default AdminConsole;
