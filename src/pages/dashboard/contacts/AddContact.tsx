import { useState, useEffect } from "react";
import { createContact } from "@api/contacts/ContactsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getUserLocations } from "@api/locations/LocationsApi";

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
    assocLocationIds: [] as number[],
  });

  const [addedLocations, setAddedLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | "">("");
  const [locationsApi, setLocationsApi] = useState<Location[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const locations = await getUserLocations();
        if (!(locations instanceof Error)) {
          setLocationsApi(
            locations.map((location, index) => ({
              ...location,
              id: location.id || index + 1,
            })),
          );
        } else {
          console.error("Error fetching locations:", locations);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    }
    fetchLocations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(Number(e.target.value) || "");
  };

  const addLocationToList = () => {
    if (!selectedLocation) return;

    const location = locationsApi.find((loc) => loc.id === selectedLocation);

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

  const handleDelete = (id: number) => {
    setAddedLocations((prevLocations) =>
      prevLocations.filter((loc) => loc.id !== id),
    );
    setContact((prevContact) => ({
      ...prevContact,
      assocLocationIds: prevContact.assocLocationIds.filter(
        (locationId) => locationId !== id,
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting contact:", contact);
    createContact(contact, addedLocations);
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
            value={selectedLocation}
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
              {addedLocations.map((location) => (
                <li
                  key={location.id}
                  className="bg-white p-4 rounded-lg shadow mb-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col flex-1">
                      <h5 className="font-semibold">{location.name}</h5>
                      <p className="text-sm text-gray-600">
                        {location.address}
                      </p>
                    </div>
                    <button
                      className="ml-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs"
                      onClick={() => handleDelete(location.id)}
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
