import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getContactById, updateContact } from "@api/contacts/ContactsApi";
import { getUserLocations } from "@api/locations/LocationsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { CSpinner } from "@coreui/react";

interface Location {
  id: string; // changed to string for consistency with DTO
  name: string;
  address: string;
  tags: string[];
}

interface ContactState {
  contactId?: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  locationIds: string[];
}

export function EditContact() {
  const { contactId } = useParams<{ contactId: string }>();
  const navigate = useNavigate();

  const [contact, setContact] = useState<ContactState>({
    name: "",
    phone: "",
    email: "",
    notes: "",
    locationIds: [],
  });

  const [locationsApi, setLocationsApi] = useState<Location[]>([]);
  const [addedLocations, setAddedLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!contactId) throw new Error("No contact ID provided");

        const contactData = await getContactById(contactId);
        const locationList = await getUserLocations();

        // Map incoming contactData to ContactState shape
        setContact({
          contactId: contactData.contactId,
          name: contactData.name,
          phone: contactData.phone,
          email: contactData.email,
          notes: contactData.notes,
          locationIds: contactData.locationIds || [],
        });

        setLocationsApi(locationList);

        // Preselect locations already associated with the contact
        const preselected = locationList.filter(loc =>
          contactData.locationIds?.includes(loc.id)
        );
        setAddedLocations(preselected);
      } catch (err) {
        console.error("Error loading contact:", err);
        setError("Failed to load contact.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [contactId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  const addLocationToList = () => {
    if (!selectedLocation) return;
    const location = locationsApi.find(loc => loc.id === selectedLocation);
    if (!location) return;
    if (addedLocations.find(loc => loc.id === location.id)) return;

    setAddedLocations(prev => [...prev, location]);
    setContact(prev => ({
      ...prev,
      locationIds: [...prev.locationIds, location.id],
    }));
    setSelectedLocation("");
  };

  const handleDeleteLocation = (id: string) => {
    setAddedLocations(prev => prev.filter(loc => loc.id !== id));
    setContact(prev => ({
      ...prev,
      locationIds: prev.locationIds.filter(lid => lid !== id),
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
      // Prepare ContactInput for update API
      const contactInput = {
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        notes: contact.notes,
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
        leftButtons={[{ children: "Cancel", onClick: () => navigate("/dashboard/contacts") }]}
        buttons={[{ children: isSaving ? "Saving..." : "Save", onClick: handleSave, disabled: isSaving }]}
      />

      {error && <p className="text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={contact.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Notes</label>
          <input
            name="notes"
            value={contact.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </form>

      <div className="bg-gray-50 p-6 rounded-xl shadow space-y-4">
        <label className="block text-sm font-medium">Associate Location</label>
        <select
          className="w-full p-2 border rounded"
          onChange={handleLocationChange}
          value={selectedLocation}
        >
          <option value="">-- Select Location --</option>
          {locationsApi.map(loc => (
            <option key={loc.id} value={loc.id}>
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
            {addedLocations.map(loc => (
              <li
                key={loc.id}
                className="flex justify-between items-center bg-white p-3 rounded shadow"
              >
                <div>
                  <p className="font-semibold">{loc.name}</p>
                  <p className="text-sm text-gray-600">{loc.address}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleDeleteLocation(loc.id)}
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
