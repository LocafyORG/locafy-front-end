import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createContact } from "@api/contacts/ContactsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllLocations, getUserLocations } from "@api/locations/LocationsApi";
import { ROUTES } from "@constants/Routes";
import { Location } from "@api/interfaces/LocationDTO";
import { ContactState, ContactInput } from "@api/interfaces/ContactsDTO";
import { FaUser, FaPhone, FaEnvelope, FaStickyNote, FaMapMarkerAlt, FaPlus, FaTrash, FaSave, FaArrowLeft } from "react-icons/fa";

type ContactField = "name" | "phone" | "email" | "notes";

export function AddContact() {
  const navigate = useNavigate();

  const [contact, setContact] = useState<ContactState>({
    name: "",
    phone: "",
    email: "",
    notes: "",
    description: "",
    uploadedById: "mock-user-id", // replace with actual user id
    locationIds: [],
  });

  const [addedLocations, setAddedLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [locationsApi, setLocationsApi] = useState<Location[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fields: ContactField[] = ["name", "phone", "email", "notes"];

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        setError(null);
        const locations = await getAllLocations();
        console.log('AddContact - fetched locations:', locations); // Debug log
        console.log('AddContact - count:', locations.length); // Debug log
        
        // Log any potential duplicates
        const locationIds = locations.map(l => l.locationId);
        const duplicateIds = locationIds.filter((id, index) => locationIds.indexOf(id) !== index);
        if (duplicateIds.length > 0) {
          console.warn('AddContact - Found duplicate location IDs:', duplicateIds);
        }
        
        // Deduplicate locations based on locationId
        const uniqueLocations = locations.filter((location, index, self) => 
          index === self.findIndex(l => l.locationId === location.locationId)
        );
        
        console.log('AddContact - unique locations:', uniqueLocations); // Debug log
        console.log('AddContact - unique count:', uniqueLocations.length); // Debug log
        setLocationsApi(uniqueLocations);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    }
    fetchLocations();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as ContactField;
    const value = e.target.value;
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

    const location = locationsApi.find(
      (loc) => loc.locationId === selectedLocation,
    );

    if (
      location &&
      location.locationId && // ensures locationId is defined
      !addedLocations.some((loc) => loc.locationId === location.locationId)
    ) {
      setAddedLocations((prev) => [...prev, location]);
      setContact((prevContact) => ({
        ...prevContact,
        locationIds: [...prevContact.locationIds, location.locationId!], // non-null assertion safe here
      }));
      setSelectedLocation("");
    }
  };

  const handleDelete = (id: string) => {
    setAddedLocations((prev) => prev.filter((loc) => loc.locationId !== id));
    setContact((prevContact) => ({
      ...prevContact,
      locationIds: prevContact.locationIds.filter((locId) => locId !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const now = new Date().toISOString();

    const payload: ContactInput = {
      ...contact,
      uploadedAt: now,
      lastUpdated: now,
    };

    console.log('Submitting contact with payload:', payload);
    console.log('Location IDs being sent:', payload.locationIds);

    try {
      await createContact(payload);
      setSuccess(true);
      setTimeout(() => {
        navigate(ROUTES.CONTACTS);
      }, 2000);
    } catch (error) {
      console.error("Failed to create contact:", error);
      setError("Failed to create contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to format address
  const formatAddress = (location: Location) => {
    const addresses = Object.values(location.addresses);
    if (addresses.length === 0) return "No address available";
    
    const firstAddress = addresses[0];
    const parts = [
      firstAddress.addressLine1,
      firstAddress.city,
      firstAddress.stateProvinceRegion,
      firstAddress.postalCode,
      firstAddress.country
    ].filter(Boolean);
    
    return parts.join(", ") || "Address not specified";
  };

  return (
    <>
      <DashboardPageHeader 
        title="Add New Contact"
        leftButtons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaArrowLeft /> BACK
              </span>
            ),
            onClick: () => navigate("/dashboard/contacts"),
            className: "flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded transition"
          },
        ]}
      />

      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <FaUser className="text-blue-500 dark:text-blue-400 text-xl" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Contact Information</h2>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center gap-2">
                <FaUser className="text-green-600" />
                <span className="font-medium">Contact added successfully! Redirecting...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <div className="flex items-center gap-2">
                <FaUser className="text-red-600" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {field[0].toUpperCase() + field.slice(1)} *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field === "name" && <FaUser className="text-gray-400 dark:text-gray-500" />}
                      {field === "phone" && <FaPhone className="text-gray-400 dark:text-gray-500" />}
                      {field === "email" && <FaEnvelope className="text-gray-400 dark:text-gray-500" />}
                      {field === "notes" && <FaStickyNote className="text-gray-400 dark:text-gray-500" />}
                    </div>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={contact[field]}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      placeholder={`Enter ${field}...`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={contact.description}
                onChange={handleChange}
                rows={4}
                disabled={isSubmitting}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                placeholder="Enter contact description..."
              />
            </div>

            <div className="flex justify-center pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Contact...
                  </>
                ) : (
                  <>
                    <FaSave className="text-lg" />
                    <span className="text-lg font-semibold">Create Contact</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Location Selection */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-purple-500 dark:text-purple-400 text-xl" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Associated Locations</h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading locations...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-4" />
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Location
                </label>
                <div className="flex gap-3">
                  <select
                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={handleLocationChange}
                    value={selectedLocation}
                    disabled={isSubmitting}
                  >
                    <option value="">-- Choose a location --</option>
                    {locationsApi.map((location) => (
                      <option key={location.locationId} value={location.locationId}>
                        {location.name || "Unnamed Location"}
                      </option>
                    ))}
                  </select>
                  <button
                    className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition disabled:opacity-50"
                    onClick={addLocationToList}
                    disabled={!selectedLocation || isSubmitting}
                    type="button"
                  >
                    <FaPlus />
                    Add
                  </button>
                </div>
              </div>

              {addedLocations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Selected Locations ({addedLocations.length})
                  </h3>
                  <div className="space-y-4">
                    {addedLocations.map((location) => (
                      <div
                        key={location.locationId}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-start"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">
                            {location.name || "Unnamed Location"}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {formatAddress(location)}
                          </p>
                          {location.locationType && (
                            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                              {location.locationType}
                            </span>
                          )}
                        </div>
                        <button
                          className="ml-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                          onClick={() => handleDelete(location.locationId!)}
                          disabled={isSubmitting}
                          type="button"
                          title="Remove location"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {locationsApi.length === 0 && (
                <div className="text-center py-8">
                  <FaMapMarkerAlt className="text-gray-300 text-4xl mx-auto mb-4" />
                  <p className="text-gray-500">No locations available.</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Create some locations first to associate with this contact.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
