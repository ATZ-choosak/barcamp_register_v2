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
    if (btnFilter !== "QUALIFIED") {
      setFilterPay(false);
    }
  }, [btnFilter]);

  const logout = () => {
    window.localStorage.clear();
    navigate("/admin");
  };

  return (
    <div>
      <div className="fixed top-0 left-0 flex w-full z-20 p-4 items-center justify-between bg-primary-500">
        <p className="text-white">
          User Count : {usersLst.filter((user) => user.firstName).length}
        </p>
        <button
          onClick={logout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
        </button>
      </div>
      <div className="container max-w-lg mx-auto p-4 pt-24">
        <div className="fixed left-1/2 p-4 top-16 pt-10 -translate-x-1/2 max-w-lg w-full bg-secondary-500 z-10">
          <input
            className="bg-white shadow-md outline-none p-4 w-full rounded-lg"
            placeholder="Search"
            onChange={(e) => setFilter(e.target.value)}
          />
          <div>
            <div className="flex items-center justify-around sm:text-sm text-[10px] p-4">
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
            <div
              className={clsx(btnFilter === "QUALIFIED" ? "block" : "hidden")}
            >
              <button
                onClick={() => setFilterPay((pre) => !pre)}
                className={clsx(
                  "w-full p-2 mb-5 text-white rounded-md",
                  filterPay ? "bg-green-500" : "bg-primary-500"
                )}
              >
                จ่ายแล้ว
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-5 mt-52 w-full">
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
            .filter((user) => (filterPay ? user.slip !== "" : user))
            .map((data, i) => (
              <UserCard user={data} key={i} update_status={update_status} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default AdminConsole;
