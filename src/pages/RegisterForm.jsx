import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import './VerifyPage.css'
import { API_BASE_URL } from "../config";

const RegisterForm = () => {

  const webcamRef = useRef(null);
  const [name, setName] = useState("");
  const [capturedImages, setCapturedImages] = useState([]);
  const [status, setStatus] = useState("");
  const [animate, setAnimate] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImages([...capturedImages, imageSrc]);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
  };

  const handleSubmit = async () => {
    if (!name || capturedImages.length === 0) {
      setStatus("⚠️ Name and at least one image required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    capturedImages.forEach((img, idx) => {
      formData.append("files", dataURLtoFile(img, `image${idx + 1}.jpg`));
    });
//"http://127.0.0.1:8000/register"
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, formData);
      setStatus(`✅ Registered successfully as ${res.data.user}`);
    } catch (error) {
      console.error(error);
      setStatus("❌ Registration failed. Please try again.");
    }
  };

  const handleReset = () => {
    setName("");
    setCapturedImages([]);
    setStatus("");
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="verify-container">
        {/* Left Panel */}
        <div className="verify-card">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam-preview"
          />

          {capturedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {capturedImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`capture-${idx}`}
                  className="w-20 h-20 object-cover rounded border shadow"
                />
              ))}
            </div>
          )}
          <h2 className="">Register Face</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="register-text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex justify-between mb-4 gap-2">
            <button
              onClick={capture}
              className="register-btns"
            >
              Capture
            </button>
            <button
              onClick={handleReset}
              className="register-btns"
            >
              Reset
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="register-btns"
          >
            Submit
          </button>

          {status && (
            <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
          )}

          
        </div>

        {/* Right Panel */}
        {/* <div className="verify-card">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded border border-gray-400 w-full h-60 object-cover"
          />

          {capturedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {capturedImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`capture-${idx}`}
                  className="w-20 h-20 object-cover rounded border shadow"
                />
              ))}
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default RegisterForm;
