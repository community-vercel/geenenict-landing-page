import React, { useState, useEffect, useRef } from "react";

const ProjectLists = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // Base64 image
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // Success/Error message

  // Ref for the form element
  const formRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Convert image to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set Base64 string
        console.log("Image converted to Base64:", reader.result); // Debugging
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}projects/getAll`);
      const data = await response.json();
      console.log("Fetched projects:", data); // Debugging
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage({ type: "error", text: "Error fetching projects" });
    } finally {
      setLoading(false);
    }
  };

  // Create or Update project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { title, description, image };
    console.log("Payload being sent:", payload); // Debugging
    const url = selectedId
      ? `${process.env.NEXT_PUBLIC_FRONT_URL}projects/update/${selectedId}`
      : `${process.env.NEXT_PUBLIC_FRONT_URL}projects/post`;
    const method = selectedId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setImage("");
        setSelectedId(null);
        fetchProjects();
        setMessage({ type: "success", text: selectedId ? "Project updated!" : "Project created!" });
      } else {
        setMessage({ type: "error", text: "Failed to save project" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error saving project" });
    } finally {
      setLoading(false);
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setSelectedId(project._id);
    setTitle(project.title);
    setDescription(project.description || "");
    setImage(project.image || "");
    console.log("Editing project:", project); // Debugging

    // Scroll to the form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}projects/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProjects();
        setMessage({ type: "success", text: "Project deleted!" });
      } else {
        setMessage({ type: "error", text: "Failed to delete project" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error deleting project" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Success/Error Message */}
      {message && (
        <div
          className={`text-white text-center py-2 mb-4 rounded ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Project Form */}
      <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {selectedId ? "Update Project" : "Create Project"}
        </h2>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
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
            "Update Project"
          ) : (
            "Create Project"
          )}
        </button>
      </form>

      {/* Project List */}
      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">Project List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {project.image && (
              <img
                src={project.image}
                alt="Project"
                className="w-full h-40 object-cover rounded-lg"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-800 mt-2">{project.title}</h3>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <div className="mt-4 flex space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                onClick={() => handleEdit(project)}
              >
                Edit
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => handleDelete(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectLists;