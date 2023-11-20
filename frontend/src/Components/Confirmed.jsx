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
    <div>
      <div>ผ่านการคัดเลือก</div>
      <div className="overflow-hidden rounded-xl w-fit h-fit">
        <QRCode
          value={user._id}
          bgColor="#ffc16a"
          fgColor="#fff"
          size={350}
          logoImage="logo.png"
          logoHeight={340}
          logoWidth={340}
          logoOpacity={0.15}
          enableCORS={true}
          qrStyle="dots"
          eyeRadius={10}
          id={"QR"}
        />
      </div>
      <button
        onClick={downloadCode}
        className="text-white bg-blue-500 p-2 rounded-lg"
      >
        Download QRCode
      </button>
    </div>
  );
}

export default Confirmed;
