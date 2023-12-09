import React, { useRef } from "react";
import { QRCode } from "react-qrcode-logo";

function Confirmed({ user }) {
  const downloadCode = () => {
    const canvas = document.getElementById("QR");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `QRCODE-${user.firstName}-${user.lastName}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10 fill-green-500"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>

      <div className="p-4 w-full text-center bg-white rounded-xl text-green-500">
        <p>ผ่านการคัดเลือก</p>
      </div>
      <p className="mt-5 text-red-500 text-center text-[12px] mb-5">**ดาวน์โหลด QRCode นี้ เพื่อใช้ยืนยันตัวตนในวันร่วมงาน**</p>
      <div className="overflow-hidden rounded-xl w-fit h-fit">
        <QRCode
          value={user._id}
          bgColor="#ffc16a"
          fgColor="#000"
          size={200}
          logoImage="logo.png"
          logoHeight={100}
          logoWidth={100}
          logoOpacity={0.3}
          enableCORS={true}
          qrStyle="dots"
          eyeRadius={10}
          id={"QR"}
        />
      </div>
      <button
        onClick={downloadCode}
        className="text-white bg-primary-500 p-2 rounded-lg w-full mt-5"
      >
        Download QRCode
      </button>
    </div>
  );
}

export default Confirmed;
