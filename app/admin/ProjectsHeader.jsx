import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const ProjectSectionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [hasData, setHasData] = useState(false); // Track if data already exists

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}project-section/getAll`);
      const data = await response.json();
      setProjects(data);

      if (data.length > 0) {
        setHasData(true); // Data exists, so set hasData to true
        setTitle(data[0].title);
        setDescription(data[0].description || "");
        setSelectedId(data[0]._id); // Set selectedId to the existing item's ID
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setMessage({ text: "Error fetching projects", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title, description };
    const url = selectedId
      ? `${process.env.NEXT_PUBLIC_FRONT_URL}project-section/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_FRONT_URL}project-section/post`;

    const method = selectedId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage({
          text: selectedId ? "Project updated successfully" : "Project created successfully",
          type: "success",
        });
        setTitle("");
        setDescription("");
        setSelectedId(null);
        fetchProjects();
      } else {
        setMessage({ text: "Error processing request", type: "error" });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ text: "Something went wrong!", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };

  const handleEdit = (project) => {
    setSelectedId(project._id);
    setTitle(project.title);
    setDescription(project.description || "");
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}project-section/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage({ text: "Project deleted successfully", type: "success" });
        fetchProjects();
        setHasData(false); // Reset hasData after deletion
      } else {
        setMessage({ text: "Error deleting project", type: "error" });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setMessage({ text: "Failed to delete project", type: "error" });
    } finally {
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {hasData ? "Update Project Header Section" : "Create Project Header Section"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium text-start">Title</label>
          {/* TinyMCE Editor */}
          <Editor
            apiKey={process.env.NEXT_PUBLIC_API_KEY}
            init={{ placeholder: "Enter Your Title here..." }}
            onEditorChange={(newValue) => setTitle(newValue)}
            value={title}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium text-start">Description</label>
          <textarea
            className="w-full p-2 border rounded-md"
            placeholder="Enter project Section description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`w-full ${
            hasData ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded-md transition flex items-center justify-center`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : null}
          {hasData ? "Update Project" : "Submit"}
        </button>

        {message.text && (
          <div
            className={`mt-4 px-4 py-2 text-sm font-medium rounded-md text-center ${
              message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>

      <h2 className="text-xl font-semibold mt-6">Project Header List</h2>
      <ul className="mt-4 space-y-2">
        {projects.map((project) => (
          <li key={project._id} className="p-4 bg-gray-500 rounded-lg shadow-sm">
            <div className="font-medium">
              <div dangerouslySetInnerHTML={{ __html: project.title }} />
            </div>
            <div className="mt-2 space-x-2">
              <button
                className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                onClick={() => handleEdit(project)}
              >
                Edit
              </button>
              <button
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(project._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectSectionForm;