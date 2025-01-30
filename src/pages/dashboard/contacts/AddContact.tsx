import { useState } from "react";
import { createContact } from "@api/contacts/ContactsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";

interface Location {
  id: number;
  name: string;
  address: string;
  tags: string[];
}

export function AddContact() {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
    assocLocationIds: [] as string[],
  });

  // Initialize the addedLocations state with the correct type
  const [addedLocations, setAddedLocations] = useState<Location[]>([]); // Now we specify the type as Location[]

  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const locationsApi = [
    { id: 1, name: "Location A", address: "123 A St", tags: ["Tag1", "Tag2"] },
    { id: 2, name: "Location B", address: "456 B Ave", tags: ["Tag3", "Tag4"] },
    { id: 3, name: "Location C", address: "789 C Rd", tags: ["Tag5", "Tag6"] },
  ];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle location selection
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  const addLocationToList = () => {
    const location = locationsApi.find(
      (loc) => loc.id === parseInt(selectedLocation),
    );

    if (location && !addedLocations.some((loc) => loc.id === location.id)) {
      setAddedLocations((prevLocations) => [...prevLocations, location]);

      setContact((prevContact) => ({
        ...prevContact,
        assocLocationIds: [...prevContact.assocLocationIds, location.id],
      }));

      setSelectedLocation("");
    } else {
      console.log("Location already added or invalid selection.");
    }
  };
  // Delete a location from the list
  const handleDelete = (index: number) => {
    setAddedLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index),
    );
    setContact((prevContact) => ({
      ...prevContact,
      assocLocationIds: prevContact.assocLocationIds.filter(
        (_, i) => i !== index,
      ), // Remove location ID from contact
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting contact:", contact);
    createContact(contact, addedLocations); // Submit the contact with associated locations (unchanged)
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardPageHeader title="Add New Contact" />

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Add Contact
          </button>
        </form>
      </div>

      {/* Location Selection */}
      <div className="bg-gray-100 shadow-lg rounded-2xl p-6 mt-6">
        <h3 className="text-xl font-semibold mb-2">Location Information</h3>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Select Location
          </label>
          <select
            id="location"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            onChange={handleLocationChange}
          >
            <option value="">-- Choose a location --</option>
            {locationsApi.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
          onClick={addLocationToList}
          disabled={!selectedLocation}
        >
          Add Location
        </button>

        {addedLocations.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Added Locations</h4>
            <ul className="mt-2">
              {addedLocations.map((location, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow mb-3">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col flex-1">
                      <h5 className="font-semibold">{location.name}</h5>
                      <p className="text-sm text-gray-600">
                        {location.address}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-gray-500">Tags:</span>
                      {location.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      className="ml-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
