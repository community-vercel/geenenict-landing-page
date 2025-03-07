import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const WordMethod = () => {
  const [workMethods, setWorkMethods] = useState([]);
  const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for button
  const [message, setMessage] = useState(""); // Custom message state
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [hasData, setHasData] = useState(false); // Track if data already exists

  useEffect(() => {
    fetchWorkMethods();
  }, []);

  const fetchWorkMethods = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}workmethod/get`);
      const result = await response.json();
      console.log("Fetched Data:", result);

      if (response.ok) {
        setWorkMethods(Array.isArray(result) ? result : [result]);
        if (result.length > 0) {
          setHasData(true); // Data exists, so set hasData to true
          setHeader(result[0].header);
          setTitle(result[0].title);
          setDescription(result[0].description);
          setEditingId(result[0]._id); // Set editingId to the existing item's ID
        }
      } else {
        setMessage("Failed to fetch work methods");
        setMessageType("error");
        hideMessage();
      }
    } catch (error) {
      setMessage("Error fetching work methods");
      setMessageType("error");
      hideMessage();
    }
  };

  const handleSubmit = async () => {
    if (!header || !title || !description) {
      setMessage("All fields are required!");
      setMessageType("error");
      hideMessage();
      return;
    }

    const payload = { header, title, description };
    const url = editingId
      ? `${process.env.NEXT_PUBLIC_FRONT_URL}workmethod/update/${editingId}`
      : `${process.env.NEXT_PUBLIC_FRONT_URL}workmethod/create`;

    const method = editingId ? "PUT" : "POST";

    setLoading(true); // Start loading

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(editingId ? "Work method updated!" : "Work method added!");
        setMessageType("success");
        fetchWorkMethods();
        resetForm();
      } else {
        setMessage(result.message || "Failed to save work method");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error submitting data");
      setMessageType("error");
    } finally {
      setLoading(false); // Stop loading
      hideMessage();
    }
  };

  const handleEdit = (method) => {
    setEditingId(method._id);
    setHeader(method.header);
    setTitle(method.title);
    setDescription(method.description);

    // Scroll to top smoothly when editing
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}workmethod/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Work method deleted!");
        setMessageType("success");
        fetchWorkMethods();
        setHasData(false); // Reset hasData after deletion
      } else {
        setMessage("Failed to delete");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error deleting work method");
      setMessageType("error");
    } finally {
      setLoading(false); // Stop loading
      hideMessage();
    }
  };

  const resetForm = () => {
    setHeader("");
    setTitle("");
    setDescription("");
    setEditingId(null);
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
      <h2 className="text-xl font-bold">Work Method Section</h2>

      <input
        type="text"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        placeholder="Header"
        className="border rounded p-2 w-full"
      />

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

      <button
        onClick={handleSubmit}
        className={`w-full ${
          hasData ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
        } text-white py-2 rounded-md transition flex items-center justify-center`}
        disabled={loading}
      >
        {loading && <LoadingSpinner />}
        {hasData ? "Update" : "Submit"}
      </button>

      {message && (
        <div
          className={`mt-2 p-2 text-white font-medium rounded-md shadow-md transition-opacity duration-500 ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <h2 className="text-lg font-bold mt-6">Saved Work Methods</h2>
      <div className="space-y-4">
        {workMethods.length > 0 ? (
          workMethods.map((method) => (
            <div key={method._id} className="border p-4 rounded shadow-md flex justify-between items-center">
              <div>
                <p><strong>Header:</strong> {method.header}</p>
                <p><strong>Title:</strong> {method.title}</p>
              </div>
              <div className="space-x-2 space-y-3">
                <button
                  onClick={() => handleEdit(method)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(method._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center justify-center"
                  disabled={loading}
                >
                  {loading && <LoadingSpinner />}
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No work methods available</p>
        )}
      </div>
    </div>
  );
};

export default WordMethod;