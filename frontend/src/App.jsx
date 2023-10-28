import React, { useEffect, useState } from "react";
import { Login } from "./AuthFunctions/authFunctions";
import { useLoaderData } from "react-router-dom";
import { countDown } from "./CountDown/countDown";
import { motion } from "framer-motion";

function App() {
  const Console = useLoaderData();
  const [countDownText, setCountDownText] = useState("Loading...");
  const [showButtonLogin, setShowButtonLogin] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      let coundown = countDown(Console.start_register);
      if (coundown.distance > 0) {
        setShowButtonLogin(false);
        setCountDownText(coundown.time);
      } else {
        setShowButtonLogin(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex w-full space-y-4 flex-col items-center justify-center mt-10">
        <p className="font-bold text-xl">Wellcome to Barcamp 8</p>
        {showButtonLogin ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <button
              className="duration-[0.2s] hover:shadow-sm hover:bg-gray-50 flex items-center justify-between bg-white shadow-md p-4 space-x-5 rounded-xl"
              onClick={Login}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                className="w-6 h-6"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#e53935"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4caf50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1565c0"
                  d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <p>Login With Google</p>
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <p>{countDownText}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
