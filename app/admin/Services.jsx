import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for button
  const [message, setMessage] = useState(""); // Custom message state
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  useEffect(() => {
    fetchServices();
  }, [refresh]);

  const triggerRefresh = () => setRefresh((prev) => !prev);

  const fetchServices = async () => {
    try {
      console.log("Fetching services...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}services/getAll`);
      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        const servicesWithBase64 = result.data.map((service) => ({
          ...service,
          image: service.image ? `data:image/jpeg;base64,${service.image}` : null,
        }));
        setServices(servicesWithBase64);
      } else {
        setMessage("Failed to fetch services");
        setMessageType("error");
        hideMessage();
      }
    } catch (error) {
      setMessage("Error fetching services");
      setMessageType("error");
      hideMessage();
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      setMessage("Title and description are required!");
      setMessageType("error");
      hideMessage();
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    setLoading(true); // Start loading

    try {
      const url = editingId
        ? `${process.env.NEXT_PUBLIC_FRONT_URL}services/update/${editingId}`
        : `${process.env.NEXT_PUBLIC_FRONT_URL}services/post`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();
      console.log("Updated API Response:", result);

      if (response.ok) {
        setMessage(editingId ? "Service updated!" : "Service added!");
        setMessageType("success");
        triggerRefresh();
        resetForm();
      } else {
        setMessage(result.message || "Failed to save service");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error submitting data");
      setMessageType("error");
      console.error("Submit error:", error);
    } finally {
      setLoading(false); // Stop loading
      hideMessage();
    }
  };

  const handleDelete = async (id) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}services/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Service deleted!");
        setMessageType("success");
        triggerRefresh();
      } else {
        setMessage("Failed to delete");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error deleting service");
      setMessageType("error");
      console.error("Delete error:", error);
    } finally {
      setLoading(false); // Stop loading
      hideMessage();
    }
  };

  const handleEdit = (service) => {
    setTitle(service.title);
    setDescription(service.description);
    setEditingId(service._id);
    setExistingImage(service.image);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedFile(null);
    setEditingId(null);
    setExistingImage("");
  };

  const hideMessage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000); // Hide message after 2 seconds
  };

  const LoadingSpinner = () => (
    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
  );

  return (
    <div className="flex flex-col justify-start mx-64 space-y-4">
      <h2 className="text-xl font-bold">Services Section</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border rounded p-2 w-full"
      />

      <Editor
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        value={description}
        onEditorChange={(newValue) => setDescription(newValue)}
        init={{ placeholder: "Description..." }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="border rounded p-2 w-full"
      />

      {existingImage && !selectedFile && (
        <div className="mt-2">
          <img src={existingImage} alt="Existing Service" className="w-16 h-16" />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        disabled={loading}
      >
        {loading && <LoadingSpinner />}
        {editingId ? "Update" : "Submit"}
      </button>

      {message && (
        <div
          className={`mt-2 p-2 text-center text-white font-medium rounded-md shadow-md transition-opacity duration-500 ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <button onClick={resetForm} className="bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2">
        Cancel
      </button>

      <h2 className="text-lg font-bold mt-4">Existing Services</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Image</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service) => (
                <tr key={service._id} className="text-center">
                  <td className="border border-gray-300 p-2">{service.title}</td>
                  <td
                    className="border border-gray-300 p-2"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  ></td>
                  <td className="border border-gray-300 p-2">
                    {service.image && (
                      <img src={service.image} alt="Service" className="w-16 h-16 mx-auto" />
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 space-y-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading && <LoadingSpinner />}
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 p-4 text-center">
                  No services available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;