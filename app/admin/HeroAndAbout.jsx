import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroAndAbout = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [subsubtitle, setSubsubtitle] = useState("");
  const [whoIAm, setWhoIAm] = useState("");
  const [expertise, setExpertise] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [hasData, setHasData] = useState(false); // Track if data already exists

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all data
  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URLS}herosection/getAll`);
      const result = await response.json();
      console.log("Fetched Data:", result);
      if (response.ok) {
        setData(result);
        if (result.length > 0) {
          setHasData(true); // Data exists, so set hasData to true
          setHeader(result[0].header || "");
          setTitle(result[0].title || "");
          setSubtitle(result[0].subtitle || "");
          setSubsubtitle(result[0].subsubtitle || "");
          setWhoIAm(result[0].whoIAm || "");
          setExpertise(result[0].expertise || "");
          setDescription(result[0].description || "");
          setEditingId(result[0]._id); // Set editingId to the existing item's ID
        }
      } else {
        setMessage({ text: result.message || "Failed to fetch data.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error fetching data!", type: "error" });
    }
  };
  
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Submit or update data
  const handleSubmit = async () => {
    if (!header || !title || !subtitle || !subsubtitle || !description || !whoIAm || !expertise) {
      setMessage({ text: "All fields are required!", type: "error" });
      return;
    }
  
    const formData = new FormData();
    formData.append("header", header);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("subsubtitle", subsubtitle);
    formData.append("description", description);
    formData.append("whoIAm", whoIAm);
    formData.append("expertise", expertise);
  
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
  
    setLoading(true);
    try {
      const url = editingId
        ? `${process.env.NEXT_PUBLIC_DJANGO_URLS}herosection/update/${editingId}`
        : `${process.env.NEXT_PUBLIC_DJANGO_URLS}herosection/post`;
  
      const method = editingId ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        body: formData, 
      });
  
      const result = await response.json();
      console.log("Server Response:", result); 
  
      if (response.ok) {
        setMessage({ text: editingId ? "Updated successfully!" : "Added successfully!", type: "success" });
        fetchData();
        resetForm();
      } else {
        setMessage({ text: result.message || "Operation failed!", type: "error" });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage({ text: "Error submitting data!", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };
  
  

  // Delete a record
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URLS}herosection/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        setMessage({ text: "Deleted successfully!", type: "success" });
        fetchData();
        setHasData(false); // Reset hasData after deletion
      } else {
        setMessage({ text: result.message || "Failed to delete!", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Error deleting record!", type: "error" });
    } finally {
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };

  // Edit a record
  const handleEdit = (item) => {
    setEditingId(item._id);
    setHeader(item.header || "");
    setTitle(item.title || "");
    setSubtitle(item.subtitle || "");
    setSubsubtitle(item.subsubtitle || "");
    setWhoIAm(item.whoIAm || "");
    setExpertise(item.expertise || "");
    setDescription(item.description || "");
    setSelectedFile(null); // Reset file selection for update
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  

  // Reset form
  const resetForm = () => {
    setHeader("");
    setTitle("");
    setSubtitle("");
    setSubsubtitle("");
    setWhoIAm("");
    setExpertise("");
    setDescription("");
    setSelectedFile(null);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col justify-start mx-64 space-y-4">
      <h2 className="text-xl font-bold">Hero & About Section</h2>

      {/* TinyMCE Editor */}
      <Editor
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        init={{ placeholder: "Enter Your Title here..." }}
        onEditorChange={(newValue) => setTitle(newValue)}
        value={title}
      />

      {/* File Upload */}
      <div>
        <label className="block text-gray-700 font-bold mb-2 text-start">Upload an Image:</label>
        <input type="file" accept="image/*" onChange={handleFileUpload} className="border rounded p-2 w-full" />
        {selectedFile && <p className="mt-2 text-gray-600">Image selected: {selectedFile.name}</p>}
      </div>

      {/* Input Fields */}
      <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Welcome to Digidaal
" className="border rounded p-2 w-full" />
      <input type="text" value={subsubtitle} onChange={(e) => setSubsubtitle(e.target.value)} placeholder="Nice to meet you!

" className="border rounded p-2 w-full" />
      <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="About me" className="border rounded p-2 w-full" />
      <Editor apiKey={process.env.NEXT_PUBLIC_API_KEY} init={{ placeholder: "Description..." }} onEditorChange={(newValue) => setDescription(newValue)} value={description} />


      {/* Text Editors */}
      <Editor apiKey={process.env.NEXT_PUBLIC_API_KEY} init={{ placeholder: "Who I am..." }} onEditorChange={(newValue) => setWhoIAm(newValue)} value={whoIAm} />
      <Editor apiKey={process.env.NEXT_PUBLIC_API_KEY} init={{ placeholder: "Key Expertise..." }} onEditorChange={(newValue) => setExpertise(newValue)} value={expertise} />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full ${
          hasData ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
        } text-white font-bold py-2 px-4 rounded flex items-center justify-center`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          </div>
        ) : hasData ? "Update" : "Submit"}
      </button>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mt-2 py-2.5 text-center text-white font-medium rounded-md shadow-md transition-opacity duration-500 ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Display Data */}
      <h2 className="text-lg font-bold mt-6">Saved Data</h2>
      <div className="space-y-4">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow-md flex justify-between items-center">
              <div>
                <div className="" dangerouslySetInnerHTML={{ __html: item.title }} />
                <p><strong>Header:</strong> {item.header}</p>
                <p><strong>Subtitle:</strong> {item.subtitle}</p>
              </div>
              <div className="space-x-2 space-y-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HeroAndAbout;