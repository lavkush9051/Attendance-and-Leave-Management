import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

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

    try {
      const res = await axios.post("http://127.0.0.1:8000/register", formData);
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
      <div className={`flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-700 ${animate ? "animate-flip" : ""}`}>
        {/* Left Panel */}
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-center mb-4">Register Face</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex justify-between mb-4 gap-2">
            <button
              onClick={capture}
              className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              📸 Capture
            </button>
            <button
              onClick={handleReset}
              className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>

          {status && (
            <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
          )}
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-4 bg-gray-100 flex flex-col items-center justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
