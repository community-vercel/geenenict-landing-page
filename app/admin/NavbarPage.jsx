import React, { useState, useEffect } from "react";

const NavbarPage = () => {
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(""); // Store preview URL
  const [logoText, setLogoText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [message, setMessage] = useState("");
  const [navbarItems, setNavbarItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [logoPreviews, setLogoPreviews] = useState(""); // Store preview URL

  

  // Fetch navbar items on component mount
  useEffect(() => {
    fetchNavbarItems();
  }, []);

  // Fetch navbar details
  const fetchNavbarItems = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}navbar/getAll`);
      const data = await response.json();
      setNavbarItems(data);
  
      if (data.length > 0) {
        // Set the first item as default values
        setLogoText(data[0].logoText);
        setButtonText(data[0].buttonText);
        setLogoPreview(`${process.env.NEXT_PUBLIC_IMG}${data[0].logo}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  



  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file)); // Preview selected file
  };

  // Handle form submission (Add & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buttonText) {
      setMessage("button text are required!");
      return;
    }

    const formData = new FormData();
    if (logo) formData.append("logo", logo);
    formData.append("logoText", logoText);
    formData.append("buttonText", buttonText);

    try {
      let response;
      if (editingId) {
        response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}navbar/update/${editingId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}navbar/post`, {
          method: "POST",
          body: formData,
        });
      }

      const result = await response.json();
      if (response.ok) {
        setMessage(editingId ? "Navbar updated successfully!" : "Navbar added successfully!");
        setEditingId(null);
        fetchNavbarItems();
      } else {
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error submitting data. Try again!");
    }

    // Reset fields
    setLogo(null);
    setLogoPreview("");
    setLogoText("");
    setButtonText("");
  };

  // Handle Edit button click
  const handleEdit = (item) => {
    setEditingId(item._id);
    setLogoText(item.logoText);
    setButtonText(item.buttonText);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLogoPreview(`${process.env.NEXT_PUBLIC_IMG}${item.logo}`); // Show existing logo
    {
        console.log("image url",`${process.env.NEXT_PUBLIC_IMG}uploads${item.logo}`)
      }
  };
  

  // Handle Delete button click
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}navbar/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessage("Navbar deleted successfully!");
        fetchNavbarItems();
      } else {
        setMessage("Failed to delete navbar item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="p-6 rounded-lg w-full px-24">
        <h2 className="text-2xl font-semibold text-start mb-4">
          {editingId ? "Edit Navbar Details" : "Upload Navbar Details"}
        </h2>



        {message && <p className="text-start text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Logo Upload */}
          <div>
            <label className="block text-gray-700 font-medium text-start">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded-md px-3 py-2"
            />
            {logo && logo? (
              <img src={logoPreviews} alt="Logo Preview" className="w-20 h-20 mt-2 rounded-md object-contain" />
            ):(
              navbarItems[0]?.image && (
              <img src={logoPreviews} alt="Logo Preview" className="w-20 h-20 mt-2 rounded-md object-contain" />
            ))}
          </div>

          {/* Logo Text */}
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

          {/* Button Text */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editingId ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* Display added navbar details */}
      <div className="w-full mt-6 px-24">
        <h3 className="text-xl font-semibold text-start mb-2">Navbar Items</h3>
        {navbarItems.length === 0 ? (
          <p className="text-gray-500">No navbar items added yet.</p>
        ) : (
          navbarItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <p className="font-medium text-gray-700">Logo Text: {item.logoText}</p>
              <p className="text-gray-600">Button Text: {item.buttonText}</p>
              <img src={`${process.env.NEXT_PUBLIC_IMG}${item.logo}`} alt="Navbar Image" className="w-20 h-20 object-contain" />

              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
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
