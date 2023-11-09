import React, { useRef, useState } from "react";
import { uploadSlip } from "../AuthFunctions/authFunctions";
import config from "../../config";

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
      }
    } else {
      alert("รองรับเฉพาะไฟล์ png jpg และ jpeg เท่านั้น");
      fileRef.current.value = null;
    }
  };

  return (
    <div>
      <p>ได้รับการตรวจสอบ กรุณาโอนเงิน</p>
      {slip_file ? <img width="500" src={slip_file} /> : null}
      <input
        ref={fileRef}
        onChange={(e) => {
          inputFile(e.target.files[0]);
        }}
        type="file"
        name="slip"
        accept="image/*"
      />
    </div>
  );
}

export default Qualified;
