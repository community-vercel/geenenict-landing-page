import React, { useState, useEffect, useRef } from "react";

const Workingwith = () => {
  const [image, setImage] = useState(""); // Base64 image
  const [link, setLink] = useState(""); // Link for the client
  const [clients, setClients] = useState([]); // List of clients
  const [loading, setLoading] = useState(false); // Loading state
  const [selectedId, setSelectedId] = useState(null); // ID of the client being edited
  const [formMessage, setFormMessage] = useState(null); // Success/Error message for form
  const [deleteMessage, setDeleteMessage] = useState(null); // Success/Error message for delete

  // Ref for the form element
  const formRef = useRef(null);

  // Fetch all clients on component mount
  useEffect(() => {
    fetchClients();
  }, []);

  // Auto-dismiss messages after 2 seconds
  useEffect(() => {
    if (formMessage) {
      const timer = setTimeout(() => setFormMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [formMessage]);

  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => setDeleteMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);

  // Fetch all clients from the backend
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}clients/getAll`);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error fetching Certficates:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Create or Update a client
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = selectedId
      ? `${process.env.NEXT_PUBLIC_FRONT_URL}clients/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_FRONT_URL}clients/post`;

    const method = selectedId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, link }), // Send Base64 image and link in the request body
      });

      if (response.ok) {
        setImage(""); // Clear the image input
        setLink(""); // Clear the link input
        setSelectedId(null); // Reset selected ID
        fetchClients(); // Refresh the list of clients
        setFormMessage({ type: "success", text: selectedId ? "Certificate updated!" : "Certificate added!" });
      } else {
        setFormMessage({ type: "error", text: "Failed to save Certificate" });
      }
    } catch (error) {
      setFormMessage({ type: "error", text: "Error saving Certificate" });
    } finally {
      setLoading(false);
    }
  };

  // Edit a client
  const handleEdit = (client) => {
    setSelectedId(client._id); // Set the ID of the client being edited
    setImage(client.image); // Populate the image input with the existing image
    setLink(client.link); // Populate the link input with the existing link

    // Scroll to the form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Delete a client
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}clients/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchClients(); // Refresh the list of clients
        setDeleteMessage({ type: "success", text: "Certificate deleted!" });
      } else {
        setDeleteMessage({ type: "error", text: "Failed to delete Certificate" });
      }
    } catch (error) {
      setDeleteMessage({ type: "error", text: "Error deleting Certificate" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Certified</h1>

      {/* Image Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
        {/* Form Success/Error Message */}
        {formMessage && (
          <div
            className={`text-white text-center py-2 mb-4 rounded ${
              formMessage.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {formMessage.text}
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Certificate Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="mt-4 w-full h-40 object-cover rounded-lg"
            />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Certificate Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter link"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                ></path>
              </svg>
              Processing...
            </>
          ) : selectedId ? (
            "Update Client"
          ) : (
            "Add Certificate"
          )}
        </button>
      </form>

      {/* Display Clients */}
      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Certificate List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client) => (
          <div
            key={client._id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {client.image && (
              <img
                src={client.image}
                alt="Client"
                className="w-full h-40 object-cover rounded-lg"
              />
            )}
            {client.link && (
              <a
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-500 hover:underline"
              >
                Visit Link
              </a>
            )}
            <div className="mt-4 flex space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                onClick={() => handleEdit(client)}
              >
                Edit
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => handleDelete(client._id)}
              >
                Delete
              </button>
            </div>
            {/* Delete Success/Error Message */}
            {deleteMessage && deleteMessage.clientId === client._id && (
              <div
                className={`text-white text-center py-2 mt-4 rounded ${
                  deleteMessage.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {deleteMessage.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Workingwith;