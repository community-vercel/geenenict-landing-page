import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const baseUrl = `${process.env.NEXT_PUBLIC_FRONT_URL}contact/getAll`;

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      if (response.ok) {
        setRequests(data);
      } else {
        toast.error("Failed to fetch requests.");
      }
    } catch {
      toast.error("Error fetching requests.");
    }
  };

  // Delete a request
  const deleteRequest = async (id) => {
    const deleteUrl = `${process.env.NEXT_PUBLIC_FRONT_URL}contact/delete/${id}`;

    try {
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Request deleted successfully.");
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== id)
        );
      } else {
        toast.error("Failed to delete request.");
      }
    } catch {
      toast.error("Error deleting request.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Requests</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3 text-sm font-semibold text-gray-700">First Name</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Last Name</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Email</th>
              <th className="p-3 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr
                  key={request._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-3 border-t text-sm text-gray-700">{request.firstName}</td>
                  <td className="p-3 border-t text-sm text-gray-700">
                    {request.lastName || "-"}
                  </td>
                  <td className="p-3 border-t text-sm text-gray-700">{request.email}</td>
                  <td className="p-3 border-t">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => deleteRequest(request._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Request Details</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                <strong>First Name:</strong> {selectedRequest.firstName}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Last Name:</strong> {selectedRequest.lastName || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {selectedRequest.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Message:</strong> {selectedRequest.message}
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;