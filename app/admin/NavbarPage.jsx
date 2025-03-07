import React, { useState, useEffect } from "react";

const NavbarPage = () => {
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [newLogoPreview, setNewLogoPreview] = useState("");

  const [logoText, setLogoText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [navbarItems, setNavbarItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for button
  const [hasData, setHasData] = useState(false); // Track if data already exists

  useEffect(() => {
    fetchNavbarItems();
  }, []);

  const fetchNavbarItems = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URLS}navbar/getAll`);
      const data = await response.json();
      setNavbarItems(data);
      if (data.length > 0) {
        setHasData(true); // Data exists, so set hasData to true
        setLogoText(data[0].logoText);
        setButtonText(data[0].buttonText);
        setLogoPreview(data[0].logo);
        setEditingId(data[0]._id); // Set editingId to the existing item's ID
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error fetching data. Please try again.");
      setMessageType("error");
      hideMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setNewLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buttonText) {
      setMessage("Button text is required!");
      setMessageType("error");
      hideMessage();
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (logo) formData.append("logo", logo);
    formData.append("logoText", logoText);
    formData.append("buttonText", buttonText);

    try {
      let response;
      if (hasData) {
        // Only allow updates if data exists
        response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URLS}navbar/update/${editingId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        // Allow adding data only if no data exists
        response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URLS}navbar/post`, {
          method: "POST",
          body: formData,
        });
      }

      const result = await response.json();
      if (response.ok) {
        setMessage(hasData ? "Navbar updated successfully!" : "Navbar added successfully!");
        setMessageType("success");
        resetForm();
        fetchNavbarItems();
      } else {
        setMessage(result.message || "Something went wrong.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error submitting data. Try again!");
      setMessageType("error");
    } finally {
      setLoading(false);
      hideMessage();
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setLogoText(item.logoText);
    setButtonText(item.buttonText);
    setLogoPreview(item.logo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DJANGO_URLS}navbar/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessage("Navbar deleted successfully!");
        setMessageType("success");
        fetchNavbarItems();
        setHasData(false); // Reset hasData after deletion
      } else {
        setMessage("Failed to delete navbar item.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setMessage("Error deleting item. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
      hideMessage();
    }
  };

  const resetForm = () => {
    setLogo(null);
    setNewLogoPreview("");
    setLogoText("");
    setButtonText("");
    setEditingId(null);
  };

  const hideMessage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);
  };

  const LoadingSpinner = () => (
    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="p-6 rounded-lg w-full px-24">
        <h2 className="text-2xl font-semibold text-start mb-4">
          {hasData ? "Edit Navbar Details" : "Upload Navbar Details"}
        </h2>

        {message && (
          <p
            className={`text-center mb-4 py-2 text-white font-medium rounded-md shadow-md transition-opacity duration-500 ${
              messageType === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium text-start">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-md px-3 py-2"
            />
            {newLogoPreview ? (
              <img src={newLogoPreview} alt="New Logo Preview" className="w-20 h-20 mt-2 rounded-md object-contain" />
            ) : (
              logoPreview && (
                <img src={logoPreview} alt="Existing Logo Preview" className="w-20 h-20 mt-2 rounded-md object-contain" />
              )
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-start">Logo Text</label>
            <input
              type="text"
              value={logoText}
              onChange={(e) => setLogoText(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Enter logo text"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-start">Button Text</label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              placeholder="Enter button text"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full ${
              hasData ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 rounded-md transition flex items-center justify-center`}
            disabled={loading}
          >
            {loading && <LoadingSpinner />}
            {hasData ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      <div className="w-full mt-6 px-24">
        <h3 className="text-xl font-semibold text-start mb-2">Navbar Items</h3>
        {navbarItems.length === 0 ? (
          <p className="text-gray-500">No navbar items added yet.</p>
        ) : (
          navbarItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <p className="font-medium text-gray-700">Logo Text: {item.logoText}</p>
              <p className="text-gray-600">Button Text: {item.buttonText}</p>
              <img src={item.logo} alt="Navbar Image" className="w-20 h-20 object-contain" />
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading && <LoadingSpinner />}
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NavbarPage;