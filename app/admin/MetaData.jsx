import { useState, useEffect } from "react";
import Head from "next/head";

const MetaData = () => {
  const [metaList, setMetaList] = useState([]);
  const [meta, setMeta] = useState({
    metaname: "",
    metaDescription: "",
    keywords: [],
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [hasData, setHasData] = useState(false); // Track if data already exists
  const [loading, setLoading] = useState(false); // Loading state for button

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000); // Close message after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchMetadata = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}metadata/get`);
      const data = await response.json();
      console.log("data...", data);
      setMetaList(data);

      if (data.length > 0) {
        setHasData(true); // Data exists, so set hasData to true
        setMeta(data[0]); // Auto-populate the form with the first item
        setEditingId(data[0]._id); // Set editingId to the existing item's ID
      }
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  const handleChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      setMeta({ ...meta, keywords: [...meta.keywords, keywordInput.trim()] });
      setKeywordInput("");
    }
  };

  const removeKeyword = (index) => {
    setMeta({
      ...meta,
      keywords: meta.keywords.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${process.env.NEXT_PUBLIC_FRONT_URL}metadata/update/${editingId}`
        : `${process.env.NEXT_PUBLIC_FRONT_URL}metadata/post`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meta),
      });

      if (response.ok) {
        setMessage(editingId ? "Metadata updated successfully!" : "Metadata added successfully!");
        fetchMetadata();
        setMeta({ metaname: "", metaDescription: "", keywords: [] });
        setEditingId(null);
      } else {
        setMessage("Failed to save metadata.");
      }
    } catch (error) {
      console.error("Error saving metadata:", error);
      setMessage("Failed to save metadata.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleEdit = (metadata) => {
    setMeta(metadata);
    setEditingId(metadata._id);
  };

  const handleDelete = async (id) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}metadata/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Metadata deleted successfully!");
        fetchMetadata();
        setHasData(false); // Reset hasData after deletion
      } else {
        setMessage("Failed to delete metadata.");
      }
    } catch (error) {
      console.error("Error deleting metadata:", error);
      setMessage("Failed to delete metadata.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Head>
        <title>{meta.metaname}</title>
        <meta name="description" content={meta.metaDescription} />
        <meta name="keywords" content={meta.keywords.join(", ")} />
      </Head>

      <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold">{hasData ? "Edit" : "Add"} SEO Meta Data</h2>

        {message && (
          <div
            className={`p-2 text-center rounded-md ${
              message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-gray-700">Meta Name (Title):</span>
            <input
              type="text"
              name="metaname"
              value={meta.metaname}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Meta Description:</span>
            <textarea
              name="metaDescription"
              value={meta.metaDescription}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            ></textarea>
          </label>

          <label className="block">
            <span className="text-gray-700">Keywords:</span>
            <div className="flex flex-wrap border rounded-md p-2 gap-2">
              {meta.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center"
                >
                  {keyword}
                  <button
                    onClick={() => removeKeyword(index)}
                    className="ml-2 text-white font-bold px-1"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press Enter..."
                className="outline-none flex-1"
              />
            </div>
          </label>

          <button
            type="submit"
            className={`mt-4 ${
              hasData ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded-md flex items-center justify-center gap-2`}
            disabled={loading}
          >
            {loading ? (
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
            ) : null}
            {hasData ? "Update" : "Save"}
          </button>
        </form>

        <h2 className="text-lg font-bold mt-6">Existing Metadata</h2>
        <ul>
          {metaList.map((item) => (
            <li key={item._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.metaname}</p>
                <p className="text-gray-500">{item.metaDescription}</p>
                <p className="text-sm text-gray-600">Keywords: {item.keywords.join(", ")}</p>
              </div>
              <div className="space-y-4 items-end">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MetaData;