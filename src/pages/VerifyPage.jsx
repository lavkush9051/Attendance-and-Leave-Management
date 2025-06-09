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
import { AuthContext } from "../context/AuthContext";


//import { Button } from "@material-tailwind/react";


export default function VerifyPage() {
  
  const webcamRef = useRef(null);
  const [matchData, setMatchData] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


    const getCurrentDateTime = () =>{
    const now = new Date();
    setCurrentDateTime({
    hours : now.getHours(),
    minutes : now.getMinutes(),
    seconds : now.getSeconds()
    });
  };

  const captureAndVerify = async () => {
  const screenshot = webcamRef.current?.getScreenshot();
  if (!screenshot) return alert("Camera not ready!");
  try {
    getCurrentDateTime();
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
    <div className="verify-container">
      <div className="verify-card">
        <h1 className="verify-heading">Click here for clockin</h1>
        {/* <p className="verify-subtext">Use your face to sign in quickly and securely.</p> */}

        {showCamera ? (
          <>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam-preview"
            />
            <button className="login-button" onClick={captureAndVerify}>
              {loading ? "Verifying..." : "📸 Capture"}
            </button>
            <button className="cancel-button" onClick={stopCamera}>❌ Close Camera</button>
          </>
        ) : (
          <>
            <div className="camera-circle" onClick={() => setShowCamera(true)}>
              <i className="fas fa-camera camera-icon"></i>
            </div>
            <button className="login-button" onClick={() => setShowCamera(true)}>Clockin</button>
            <p className="verify-subtext">Click the circle or button above to verify your face image.</p>
          </>
        )}

        {status && (
          <div className={`verify-status ${matchData?.status === "success" ? "success" : "failed"}`}>
            {status}
          </div>
        )}

        {matchData?.status === "success" && (
          <div className="verify-details">
            <p>👤 Name: <strong>{matchData.user}</strong></p>
            <p>📏 Distance: <strong>{matchData.distance.toFixed(4)}</strong></p>
            <p> Clockin Time : <strong>{currentDateTime.hours}:{currentDateTime.minutes}:{currentDateTime.seconds}</strong></p>
          </div>
        )}

        {matchData?.status === "failed" && (
          <div className="verify-details">
            <p>Closest Match: <strong>{matchData.closest_match}</strong></p>
            <p>Distance: <strong>{matchData.closest_distance.toFixed(4)}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

