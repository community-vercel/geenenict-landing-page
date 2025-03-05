import React, { useState, useEffect } from "react";

const Footer = () => {
  const [footer, setFooter] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" }); // State for messages
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    subtitle: "",
    email: "",
    phone: "",
    linkedin: "",
    kvk: "",
    btw: "",
    copyright: "",
  });

  // Fetch Footer Data
  const fetchFooter = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}footer/get`);
      const data = await response.json();
      if (response.ok && data.data) {
        const { _id, __v, companyName, companyLink, ...filteredData } = data.data;
        setFooter(filteredData);
        setFormData(filteredData);
      } else {
        setMessage({ type: "error", text: "Failed to fetch footer data." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error fetching footer." });
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update Footer
  const handleSubmit = async (method, endpoint, successMessage, errorMessage) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}footer/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage({ type: "success", text: successMessage });
        setTimeout(fetchFooter, 500);
      } else {
        setMessage({ type: "error", text: errorMessage });
      }
    } catch {
      setMessage({ type: "error", text: errorMessage });
    }
  };

  // Delete Footer
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}footer/delete`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessage({ type: "success", text: "Footer deleted successfully!" });
        setFooter(null);
        setFormData({
          title: "",
          address: "",
          subtitle: "",
          email: "",
          phone: "",
          linkedin: "",
          kvk: "",
          btw: "",
          copyright: "",
        });
      } else {
        setMessage({ type: "error", text: "Error deleting footer." });
      }
    } catch {
      setMessage({ type: "error", text: "Error deleting footer." });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Footer Management</h2>

      {/* Message Display */}
      {message.text && (
        <div
          className={`p-2 mb-4 text-sm rounded-md ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Footer Form */}
      <div className="grid grid-cols-2 gap-4 text-start">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{key}</label>
            <textarea
              type="text"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        {!footer ? (
          <button
            onClick={() => handleSubmit("POST", "create", "Footer created successfully!", "Error creating footer.")}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Footer
          </button>
        ) : (
          <>
            <button
              onClick={() => handleSubmit("PUT", "update", "Footer updated successfully!", "Error updating footer.")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update Footer
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete Footer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Footer;
