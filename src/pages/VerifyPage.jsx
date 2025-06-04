// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const VerifyPage = () => {
//   const webcamRef = useRef(null);
//   const [status, setStatus] = useState("");
//   const [matchData, setMatchData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const captureAndVerify = async () => {
//     const screenshot = webcamRef.current.getScreenshot();
//     if (!screenshot) {
//       setStatus("⚠️ No face detected.");
//       return;
//     }

//     const file = dataURLtoFile(screenshot, "verify.jpg");
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     setStatus("");
//     setMatchData(null);

//     try {
//       const res = await axios.post("http://127.0.0.1:8000/verify", formData);
//       setMatchData(res.data);
//       setStatus(res.data.status === "success" ? "✅ Match Found" : "❌ No Match Found");
//     } catch (err) {
//       console.error(err);
//       setStatus("❌ Verification failed.");
//     }
//     setLoading(false);
//   };

//   const dataURLtoFile = (dataurl, filename) => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new File([u8arr], filename, { type: mime });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-4">
//       <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-6 flex gap-6">
//         {/* Left: Camera */}
//         <div className="w-1/2 flex flex-col items-center">
//           <Webcam
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             className="rounded-lg border border-gray-300 w-64 h-48 object-cover"
//           />
//           <button
//             onClick={captureAndVerify}
//              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
//           >
//             {loading ? "Verifying..." : "🔍 Verify Face"}
//           </button>
//         </div>

//         {/* Right: Result */}
//         <div className="w-1/2 flex flex-col justify-center items-center">
//           {status && (
//             <div className={`text-lg font-semibold mt-2 ${matchData?.status === "success" ? "text-green-600" : "text-red-600"}`}>
//               {status}
//             </div>
//           )}

//           {matchData?.status === "success" && (
//             <div className="mt-4 text-center bg-gray-100 p-4 rounded shadow w-full">
//               <h2 className="text-xl font-semibold mb-2">Matched User</h2>
//               <p className="text-gray-700">👤 Name: <span className="font-medium">{matchData.user}</span></p>
//               <p className="text-gray-700">📏 Distance: <span className="font-medium">{matchData.distance.toFixed(4)}</span></p>
//             </div>
//           )}

//           {matchData?.status === "failed" && (
//             <div className="mt-4 text-center bg-yellow-100 p-4 rounded shadow w-full">
//               <p className="text-gray-700">Closest Match: <strong>{matchData.closest_match}</strong></p>
//               <p className="text-gray-700">Distance: <strong>{matchData.closest_distance.toFixed(4)}</strong></p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyPage;

function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import './VerifyPage.css'

//import { Button } from "@material-tailwind/react";


export default function VerifyPage() {
  const webcamRef = useRef(null);
  const [matchData, setMatchData] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const captureAndVerify = async () => {
  const screenshot = webcamRef.current?.getScreenshot();
  if (!screenshot) return alert("Camera not ready!");
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", dataURLtoFile(screenshot, "capture.jpg"));

    const response = await axios.post(
      "http://127.0.0.1:8000/verify",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    setMatchData(response.data);
    setStatus(
      response.data.status === "success"
        ? "✅ Match Found"
        : "❌ No Match Found"
    );
  } catch (err) {
    console.error(err);
    setStatus("❌ Error contacting server");
  } finally {
    setLoading(false);
  }
};

  const stopCamera = () => {
    setShowCamera(false);
    setMatchData(null);
    setStatus("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center px-2">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md mx-auto p-6 flex flex-col items-center space-y-6 transition-all duration-500 ease-in-out">
        {/* Camera and buttons */}
        <div className="flex flex-col items-center w-full space-y-3">
          {showCamera ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-lg border border-gray-300 w-full max-w-xs h-48 object-cover transition duration-300 animate-fade-in"
              />
              <button
                onClick={captureAndVerify}
                className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition mt-2 w-full sm:w-auto"
                style={{ minWidth: 130 }}
              >
                {loading ? "Verifying face..." : "🔍 Clock in"}
              </button>
              <button
                onClick={stopCamera}
                className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition mt-2 w-full sm:w-auto"
                style={{ minWidth: 130 }}
              >
                ❌ Stop Camera
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowCamera(true)}
              className="btn-buttonCamera"
              style={{ minWidth: 130 }}
            >
              📷 Start Camera
            </button>
          )}
        </div>

        {/* Result */}
        <div className="flex flex-col items-center w-full">
          {status && (
            <div
              className={`text-lg font-semibold mb-2 transition-all duration-500 text-center w-full ${
                matchData?.status === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {status}
            </div>
          )}

          {matchData?.status === "success" && (
            <div className="mt-2 text-center bg-gray-100 p-4 rounded shadow w-full animate-fade-in">
              <h2 className="text-xl font-semibold mb-2">Matched User</h2>
              <p className="text-gray-700">
                👤 Name: <span className="font-medium">{matchData.user}</span>
              </p>
              <p className="text-gray-700">
                📏 Distance:{" "}
                <span className="font-medium">
                  {matchData.distance.toFixed(4)}
                </span>
              </p>
            </div>
          )}

          {matchData?.status === "failed" && (
            <div className="mt-2 text-center bg-yellow-100 p-4 rounded shadow w-full animate-fade-in">
              <p className="text-gray-700">
                Closest Match: <strong>{matchData.closest_match}</strong>
              </p>
              <p className="text-gray-700">
                Distance:{" "}
                <strong>{matchData.closest_distance.toFixed(4)}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

