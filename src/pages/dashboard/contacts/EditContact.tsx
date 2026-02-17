import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getContactById, updateContact } from "@api/contacts/ContactsApi";
import { getUserLocations } from "@api/locations/LocationsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { CSpinner } from "@coreui/react";
import { ContactState } from "@api/interfaces/ContactsDTO";
import { Location } from "@api/interfaces/LocationDTO";

export function EditContact() {
  const { contactId } = useParams<{ contactId: string }>();
  const navigate = useNavigate();

  const [contact, setContact] = useState<ContactState>({
    name: "",
    phone: "",
    email: "",
    notes: "",
    description: "",
    uploadedById: "", // replace with actual user id if needed
    locationIds: [],
  });

  const [locationsApi, setLocationsApi] = useState<Location[]>([]);
  const [addedLocations, setAddedLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!contactId) {
        setError("No contact ID provided");
        setIsLoading(false);
        return;
      }

      try {
        const [contactData, locationList] = await Promise.all([
          getContactById(contactId),
          getUserLocations(),
        ]);

        if (!contactData || typeof contactData !== "object") {
          throw new Error("Invalid contact data");
        }

        if (!Array.isArray(locationList)) {
          throw new Error("Invalid locations list");
        }

        setContact({
          name: contactData.name ?? "",
          phone: contactData.phone ?? "",
          email: contactData.email ?? "",
          notes: contactData.notes ?? "",
          description: contactData.description ?? "",
          uploadedById: contactData.uploadedById ?? "",
          locationIds: contactData.locationIds ?? [],
        });

        const safeLocationList = Array.isArray(locationList)
          ? locationList
          : [];
        const safeLocationIds = Array.isArray(contactData.locationIds)
          ? contactData.locationIds
          : [];

        setLocationsApi(safeLocationList);

        const preselected = safeLocationList.filter(
          (loc) =>
            typeof loc.locationId === "string" &&
            safeLocationIds.includes(loc.locationId),
        );
        setAddedLocations(preselected);
      } catch (err: unknown) {
        console.error("Error loading contact:", err);
        setError("Failed to load contact.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [contactId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  const addLocationToList = () => {
    if (!selectedLocation) return;

    const location = locationsApi.find(
      (loc) => loc.locationId === selectedLocation,
    );
    if (!location || typeof location.locationId !== "string") return;

    if (addedLocations.find((loc) => loc.locationId === location.locationId))
      return;

    setAddedLocations((prev) => [...prev, location]);

    setContact((prev) => ({
      ...prev,
      locationIds: [...prev.locationIds, location.locationId as string],
    }));

    setSelectedLocation("");
  };

  const handleDeleteLocation = (id: string) => {
    setAddedLocations((prev) => prev.filter((loc) => loc.locationId !== id));
    setContact((prev) => ({
      ...prev,
      locationIds: prev.locationIds.filter((lid) => lid !== id),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactId) {
      setError("Invalid contact ID.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const contactInput = {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        notes: contact.notes,
        description: contact.description,
        uploadedById: contact.uploadedById,
        assocLocationIds: contact.locationIds,
      };

      await updateContact(contactId, contactInput);
      navigate("/dashboard/contacts");
    } catch (err) {
      console.error("Error saving contact:", err);
      setError("Failed to save contact.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <DashboardPageHeader
        title="Edit Contact"
        leftButtons={[
          {
            children: "Cancel",
            onClick: () => navigate("/dashboard/contacts"),
            className: "flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded transition"
          },
        ]}
        buttons={[
          { children: isSaving ? "Saving..." : "Save", onClick: handleSave },
        ]}
      />

      {error && <p className="text-red-600 text-center">{error}</p>}

      <form
        onSubmit={handleSave}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            name="email"
            type="email"
            value={contact.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
          <input
            name="notes"
            value={contact.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            value={contact.description}
            //onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
            rows={3}
          />
        </div>
      </form>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow space-y-4 border border-gray-100 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Associate Location</label>
        <select
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
          onChange={handleLocationChange}
          value={selectedLocation}
        >
          <option value="">-- Select Location --</option>
          {locationsApi.map((loc) => (
            <option key={loc.locationId} value={loc.locationId}>
              {loc.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={addLocationToList}
          disabled={!selectedLocation}
        >
          Add Location
        </button>

        {addedLocations.length > 0 && (
          <ul className="space-y-2 mt-4">
            {addedLocations.map((loc) => (
              <li
                key={loc.locationId}
                className="flex justify-between items-center bg-white p-3 rounded shadow"
              >
                <div>
                  <p className="font-semibold">{loc.name}</p>
                  // <p className="text-sm text-gray-600">{loc.notes}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => {
                    if (loc.locationId) {
                      handleDeleteLocation(loc.locationId);
                    }
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
