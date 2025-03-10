import React, { useState, useEffect } from "react";

const ContactSection = () => {
  const [contact, setContact] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" }); // Success/Error Message
  const [loading, setLoading] = useState(false); // Loading State
  const [formData, setFormData] = useState({
    title: "",
    image: "", // Base64 string for image
  });

  const baseUrl = `${process.env.NEXT_PUBLIC_FRONT_URL}contact-section`;

  // Fetch Contact Section Data
  const fetchContact = async () => {
    try {
      const response = await fetch(`${baseUrl}/getAll`);
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setContact(data[0]);
        setFormData({ title: data[0].title, image: data[0].image }); // Set Base64 image
      } else {
        setMessage({ type: "error", text: "No contact section found." });
      }
    } catch {
      setMessage({ type: "error", text: "Error fetching contact section." });
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  // Auto-clear message after 2 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload (Convert to Base64)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // Set Base64 string
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  // Handle Create
  const handleCreate = async () => {
    setLoading(true);

    const payload = {
      title: formData.title,
      image: formData.image, // Base64 string
    };

    try {
      const response = await fetch(`${baseUrl}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Contact section created successfully!" });
        fetchContact();
      } else {
        setMessage({ type: "error", text: "Error creating contact section." });
      }
    } catch {
      setMessage({ type: "error", text: "Error creating contact section." });
    } finally {
      setLoading(false);
    }
  };

  // Handle Update
  const handleUpdate = async () => {
    if (!contact || !contact._id) {
      setMessage({ type: "error", text: "Invalid contact ID." });
      return;
    }
    setLoading(true);

    const payload = {
      title: formData.title,
      image: formData.image, // Base64 string
    };

    try {
      const response = await fetch(`${baseUrl}/update/${contact._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
        body: JSON.stringify(payload),
      });

      // console.log("Update Response:", response); // Log the response

      if (response.ok) {
        setMessage({ type: "success", text: "Contact section updated successfully!" });
        fetchContact();
      } else {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text); // Try to parse as JSON
          console.error("Update Error:", errorData);
          setMessage({ type: "error", text: errorData.message || "Error updating contact section." });
        } catch {
          console.error("Update Error (Non-JSON):", text);
          setMessage({ type: "error", text: "Server returned an error. Check the logs." });
        }
      }
    } catch (error) {
      console.error("Update Error:", error);
      setMessage({ type: "error", text: "Error updating contact section." });
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!contact || !contact._id) {
      setMessage({ type: "error", text: "Invalid contact ID." });
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/delete/${contact._id}`, {
        method: "DELETE",
      });

      console.log("Delete Response:", response); // Log the response

      if (response.ok) {
        setMessage({ type: "success", text: "Contact section deleted successfully!" });
        setContact(null);
        setFormData({ title: "", image: "" });
      } else {
        const errorData = await response.json(); // Log error details
        console.error("Delete Error:", errorData);
        setMessage({ type: "error", text: "Error deleting contact section." });
      }
    } catch (error) {
      console.error("Delete Error:", error);
      setMessage({ type: "error", text: "Error deleting contact section." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Contact Section</h2>

      {/* Success/Error Message Below Contact Section */}
      {message.text && (
        <div
          className={`w-full p-2 mb-4 text-sm text-center font-medium rounded-md ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Title</label>
          <textarea
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="p-2 py-12 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border rounded-md"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-4 w-full h-40 object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        {!contact ? (
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Add Contact Section"
            )}
          </button>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Update Contact Section"
              )}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Delete Contact Section"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactSection;