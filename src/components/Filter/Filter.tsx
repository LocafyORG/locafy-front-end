import React from "react";

const FilterComponent = () => {
  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center gap-4 flex-wrap">
      <h2 className="font-semibold text-lg">Locations</h2>
      <input
        type="text"
        placeholder="Search by keyword"
        className="p-2 border rounded w-56"
      />
      <div className="flex gap-4">
        <select className="p-2 border rounded">
          <option>City</option>
          {/* Add city options here */}
        </select>
        <select className="p-2 border rounded">
          <option>Country</option>
          {/* Add country options here */}
        </select>
        <select className="p-2 border rounded">
          <option>State</option>
          {/* Add state options here */}
        </select>
        <select className="p-2 border rounded">
          <option>Owner</option>
          {/* Add owner options here */}
        </select>
        <select className="p-2 border rounded">
          <option>Tags</option>
          {/* Add tag options here */}
        </select>
      </div>
      <button className="ml-auto bg-gray-200 p-2 rounded">
        Add New Location
      </button>
    </div>
  );
};

export default FilterComponent;
