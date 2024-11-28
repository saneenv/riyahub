import React, { useEffect, useState } from "react";

const AddCompanyType = () => {
  const [data, setData] = useState(null);
  const [newDistrict, setNewDistrict] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  // Fetch data from the backend
  useEffect(() => {
    fetch(`${apiBaseUrl}/datacompany`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle adding a new district
  const handleAddDistrict = () => {
    fetch(`${apiBaseUrl}/addcompany`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ district: newDistrict }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add district");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data); // Update state with the modified data
        setNewDistrict(""); // Clear the input field
      })
      .catch((error) => {
        console.error("Error adding district:", error);
      });
  };

  // Handle deleting a district
  const handleDeleteDistrict = (district) => {
    fetch(`${apiBaseUrl}/deletecompany`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ district }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete district");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data); // Update state with the modified data
      })
      .catch((error) => {
        console.error("Error deleting district:", error);
      });
  };

  // Filtered list of districts based on the search term
  const filteredDistricts =
    data?.states[0].districts.filter((district) =>
      district.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (!data) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Manage CompanyType
        </h1>

        {/* Add District Section */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            value={newDistrict}
            onChange={(e) => setNewDistrict(e.target.value)}
            placeholder="Add new CompanType"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddDistrict}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Add
          </button>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search CompanyType"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* District List Section */}
        <ul className="space-y-4">
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((district, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md"
              >
                <span className="text-gray-800">{district}</span>
                <button
                  onClick={() => handleDeleteDistrict(district)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No CompanyType found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddCompanyType;
