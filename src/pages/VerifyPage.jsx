import React, { useRef, useState, useContext } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import './VerifyPage.css';
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../config";



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

export default function VerifyPage({ onClose }) {
  const webcamRef = useRef(null);
  const [matchData, setMatchData] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const { clockIn } = useContext(AuthContext);
 // const employee = AuthContext.employee;
  const { employee } = useContext(AuthContext);
  console.log("Employee ID:", employee);

  const getCurrentDateTime = () => {
    const now = new Date();
    setCurrentDateTime({
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds()
    });
  };

  const captureAndVerify = async () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) return alert("Camera not ready!");
    try {
      getCurrentDateTime();
      setLoading(true);
      const username = localStorage.getItem("username");
      if (!username) {
        setStatus("❌ User not logged in");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", dataURLtoFile(screenshot, "capture.jpg"));
      formData.append("face_user_emp_id", employee.emp_id);
      // "http://127.0.0.1:8000/verify"
      const response = await axios.post(
        `${API_BASE_URL}/verify`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMatchData(response.data);
      console.log(response.data);
      setStatus(
        response.data.status === "success"
          ? "✅ Match Found"
          : "❌ No Match Found"
      );
      if (response.data.status === "success") {
        clockIn();
      }
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
    onClose(); // closes modal
  };

  return (
    <div className="modal-overlay">
      <div className="verify-card">
        <button className="close-modal-btn" onClick={onClose}>✖</button>
        <h1 className="verify-heading">Clock In / Clock Out</h1>
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
          <div className="camera-circle" onClick={() => setShowCamera(true)}>
            <i className="fas fa-camera camera-icon"></i>
          </div>
        )}

        {status && (
          <div className={`verify-status ${matchData?.status === "success" ? "success" : "failed"}`}>
            {status}
          </div>
        )}

{matchData?.status === "success" && (
  <div className="verify-details">
    <p>👤 Name: <strong>{matchData.user}</strong></p>
    <p>
      📏 Distance: <strong>
        {typeof matchData.distance === "number"
          ? matchData.distance.toFixed(4)
          : "-"}
      </strong></p>
    <p> Clockin Time : <strong>{currentDateTime.hours}:{currentDateTime.minutes}:{currentDateTime.seconds}</strong></p>
  </div>
)}

{matchData?.status === "failed" && (
  <div className="verify-details">
    <p>Closest Match: <strong>{matchData.closest_match}</strong></p>
    <p>Distance: <strong>
      {typeof matchData.closest_distance === "number"
        ? matchData.closest_distance.toFixed(4)
        : "-"}
    </strong></p>
  </div>
)}

      </div>
    </div>
  );
}
