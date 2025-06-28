import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createContact } from "@api/contacts/ContactsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getUserLocations } from "@api/locations/LocationsApi";
import { ROUTES } from "@constants/Routes";

interface Location {
  id: string;
  name: string;
  address: string;
  tags: string[];
}

export function AddContact() {
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
    description: "",
    uploadedById: "mock-user-id", // replace with actual logged-in user ID
    locationIds: [] as string[],
  });

  const [addedLocations, setAddedLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | "">("");
  const [locationsApi, setLocationsApi] = useState<Location[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const locations = await getUserLocations();
        if (!(locations instanceof Error)) {
          setLocationsApi(locations);
        } else {
          console.error("Error fetching locations:", locations);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    }
    fetchLocations();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  const addLocationToList = () => {
    if (!selectedLocation) return;

    const location = locationsApi.find((loc) => loc.id === selectedLocation);
    if (location && !addedLocations.some((loc) => loc.id === location.id)) {
      setAddedLocations((prev) => [...prev, location]);
      setContact((prevContact) => ({
        ...prevContact,
        locationIds: [...prevContact.locationIds, location.id],
      }));
      setSelectedLocation("");
    }
  };

  const handleDelete = (id: string) => {
    setAddedLocations((prev) => prev.filter((loc) => loc.id !== id));
    setContact((prevContact) => ({
      ...prevContact,
      locationIds: prevContact.locationIds.filter((locId) => locId !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const now = new Date().toISOString();
    const payload = {
      ...contact,
      uploadedAt: now,
      lastUpdated: now,
      nonFilmingIds: [], // adjust if needed
    };

    try {
      await createContact(payload, addedLocations);
      setSuccess(true);
      setTimeout(() => {
        navigate(ROUTES.CONTACTS); // change redirect as needed
      }, 2000);
    } catch (error) {
      console.error("Failed to create contact:", error);
      // Add error state if you want
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardPageHeader title="Add New Contact" />

      <div className="bg-white shadow-lg rounded-2xl p-6">
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Contact added successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "phone", "email", "notes"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 font-medium mb-1">
                {field[0].toUpperCase() + field.slice(1)}:
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={(contact as any)[field]}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description:
            </label>
            <textarea
              name="description"
              value={contact.description}
              onChange={handleChange}
              rows={3}
              disabled={isSubmitting}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg shadow text-white ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Adding..." : "Add Contact"}
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
            disabled={isSubmitting}
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
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 disabled:opacity-50"
          onClick={addLocationToList}
          disabled={!selectedLocation || isSubmitting}
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
                  className="bg-white p-4 rounded-lg shadow mb-3 flex justify-between items-center"
                >
                  <div className="flex flex-col flex-1">
                    <h5 className="font-semibold">{location.name}</h5>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                  <button
                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs"
                    onClick={() => handleDelete(location.id)}
                    disabled={isSubmitting}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
