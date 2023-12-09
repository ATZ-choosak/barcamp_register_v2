import React, { useRef, useState } from "react";
import { uploadSlip } from "../AuthFunctions/authFunctions";
import config from "../../config";
import Swal from "sweetalert2";

function Qualified({ user }) {
  const [slip_file, setSlipFile] = useState(
    user.slip ? config.apiPrefix + "/" + user.slip : null
  );
  const fileRef = useRef(null);

  const inputFile = async (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      const formData = new FormData();
      formData.append("id", user._id);
      formData.append("slip", file);

      let res = await uploadSlip(formData);
      if (!res.error) {
        setSlipFile(URL.createObjectURL(file));
        Swal.fire({
          title: "แจ้งเตือน",
          text: " อัพโหลดสลิปสำเร็จ",
          icon: "success",
          confirmButtonText: "รับทราบ",
          confirmButtonColor: "#FF8C00"
        })
      }
    } else {
      alert("รองรับเฉพาะไฟล์ png jpg และ jpeg เท่านั้น");
      fileRef.current.value = null;
    }
  };

  return (
    <div>
      <div className="p-10 w-full text-center bg-white rounded-xl shadow-md text-primary-500">
        <p>ได้รับการตรวจสอบเรียบร้อยแล้ว กรุณาโอนเงินเพื่อยืนยันการสมัคร</p>
      </div>
      <div className="w-full h-96 mt-10 shadow-md rounded-xl">
        <img className="w-full h-full object-contain" src="https://www.paocloud.co.th/wp-content/uploads/2021/01/Screen-Shot-2564-01-26-at-18.56.53.png" />
      </div>
      {slip_file ? (
        <div className="w-full h-96 overflow-hidden mt-10 shadow-md rounded-xl">
          <img className="object-contain w-full h-full"  src={slip_file} />
        </div>
      ) : null}
      <input
        className="hidden"
        ref={fileRef}
        onChange={(e) => {
          inputFile(e.target.files[0]);
        }}
        type="file"
        name="slip"
        accept="image/*"
      />
      <button
        onClick={() => fileRef.current.click()}
        className="text-white bg-primary-500 p-2 rounded-lg w-full mt-10 mb-10 outline-none"
      >
        อัพโหลดสลิป
      </button>
    </div>
  );
}

export default Qualified;
