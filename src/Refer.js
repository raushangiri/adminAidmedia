import React, { useState } from "react";
import { Link } from "react-router-dom";
const Refer = () => {
  const [message, setMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText("Text to be copied")
      .then(() => setMessage("Text copied to clipboard"))
      .catch(() => setMessage("Failed to copy text"));
  };

  return (
    <div className="AdminContainer">
      <div className="row mx-0 p-4">
        <div className="col-sm-12 rounded p-5 metalic-color ">
          <div className="col-sm-6 mx-auto">
            <h2 className="mb-4">Refer </h2>
            <label className="form-label">copy code and share</label>
            <h5 className="border border-info rounded p-4">x7e38dkd9</h5>
            <button className="btn btn-info rounded">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refer;
