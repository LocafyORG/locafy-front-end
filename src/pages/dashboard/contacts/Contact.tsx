import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaStickyNote,
  FaCalendarAlt,
  FaEdit,
  FaShareAlt,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaTag,
} from "react-icons/fa";

import {
  getContactById,
  getLocationByContact,
} from "@api/contacts/ContactsApi";
import { getLocationById } from "@api/locations/LocationsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";

import type { Location } from "@api/interfaces/LocationDTO";
import type { Contact } from "@api/interfaces/ContactsDTO";

export function Contact() {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const {
    data: contact,
    isLoading,
    error,
  } = useQuery<Contact, Error>({
    queryKey: ["contact", contactId],
    queryFn: () => getContactById(String(contactId)),
    enabled: !!contactId,
  });

  // Debug logging
  useEffect(() => {
    if (contact) {
      console.log('Contact data received:', contact);
      console.log('Contact locationIds:', contact.locationIds);
    }
  }, [contact]);

  // Fetch location details for each locationId in the contact
  const {
    data: associatedLocations,
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useQuery<Location[], Error>({
    queryKey: ["contact-locations", contactId, contact?.locationIds],
    queryFn: async () => {
      if (!contact?.locationIds || contact.locationIds.length === 0) {
        console.log('No locationIds found in contact, trying getLocationByContact');
        // Try the alternative method
        try {
          const locations = await getLocationByContact(String(contactId));
          console.log('getLocationByContact result:', locations);
          return locations;
        } catch (error) {
          console.log('getLocationByContact failed:', error);
          return [];
        }
      }
      
      console.log('Fetching locations for IDs:', contact.locationIds);
      
      // Fetch each location by ID
      const locationPromises = contact.locationIds.map(locationId => 
        getLocationById(locationId)
      );
      
      try {
        const locations = await Promise.all(locationPromises);
        console.log('Fetched locations:', locations);
        const validLocations = locations.filter(location => location !== null);
        
        if (validLocations.length === 0) {
          console.log('No valid locations found, trying getLocationByContact as fallback');
          try {
            const fallbackLocations = await getLocationByContact(String(contactId));
            console.log('Fallback locations:', fallbackLocations);
            return fallbackLocations;
          } catch (fallbackError) {
            console.log('Fallback also failed:', fallbackError);
            return [];
          }
        }
        
        return validLocations;
      } catch (error) {
        console.error("Failed to fetch some locations:", error);
        // Try fallback
        try {
          const fallbackLocations = await getLocationByContact(String(contactId));
          console.log('Fallback locations after error:', fallbackLocations);
          return fallbackLocations;
        } catch (fallbackError) {
          console.log('Fallback also failed after error:', fallbackError);
          return [];
        }
      }
    },
    enabled: !!contactId,
  });

  useEffect(() => {
    if (!contactId) {
      console.warn("No contact ID found in URL.");
    }
  }, [contactId]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <CSpinner />
          <p className="text-gray-600">Loading contact details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="text-center">
          <FaUserCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-red-600">Error loading contact</h1>
          <p className="text-gray-600 mt-2">Failed to load contact data.</p>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="w-full h-full flex justify-center items-center min-h-screen">
        <div className="text-center">
          <FaUserCircle className="text-yellow-500 text-4xl mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-yellow-600">Contact not found</h1>
          <p className="text-gray-600 mt-2">The requested contact could not be found.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleString() : "N/A";

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
        title={contact.name || "Unnamed Contact"}
        leftButtons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaArrowLeft /> BACK
              </span>
            ),
            onClick: () => navigate("/dashboard/contacts"),
            className: "flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
          },
        ]}
        buttons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaShareAlt /> SHARE
              </span>
            ),
            onClick: () => {
              alert("Share feature coming soon!");
            },
            className:
              "flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition",
          },
          {
            children: (
              <span className="flex items-center gap-2">
                <FaEdit /> EDIT CONTACT
              </span>
            ),
            onClick: () => {
              navigate(`/dashboard/contacts/edit/${contactId}`);
            },
            className:
              "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition",
          },
        ]}
      />

      <div className="max-w-6xl mx-auto mt-8">
        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <Paper className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-blue-900 dark:to-blue-800 rounded-full shadow-lg">
                  <FaUserCircle size={80} className="text-gray-500 dark:text-blue-300" />
                  <span className="mt-2 text-lg font-semibold text-gray-700 dark:text-blue-300">
                    {contact.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </span>
                </div>
                
                {/* Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                      {contact.name || "Unnamed Contact"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {contact.description || "No description available"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <FaEnvelope className="text-blue-500 dark:text-blue-400 text-xl" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{contact.email || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <FaPhone className="text-green-500 dark:text-green-400 text-xl" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{contact.phone || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {contact.notes && (
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <FaStickyNote className="text-yellow-500 dark:text-yellow-400 text-xl" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Notes</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{contact.notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <Paper className="p-6 bg-white shadow-xl rounded-xl border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Metadata</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <FaCalendarAlt className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Created</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(contact.uploadedAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <FaCalendarAlt className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Last Updated</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(contact.lastUpdated)}
                    </p>
                  </div>
                </div>
              </div>
            </Paper>

            {/* Quick Actions */}
            <Paper className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition"
                  onClick={() => navigate(`/dashboard/contacts/edit/${contactId}`)}
                >
                  <FaEdit className="text-blue-500 dark:text-blue-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Edit Contact</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg transition">
                  <FaShareAlt className="text-green-500 dark:text-green-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">Share Contact</span>
                </button>
              </div>
            </Paper>
          </div>
        </div>

        {/* Associated Locations */}
        <Paper className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <FaMapMarkerAlt className="text-purple-500 dark:text-purple-400 text-xl" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Associated Locations</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({associatedLocations?.length || 0} locations)
            </span>
          </div>

          {isLoadingLocations ? (
            <div className="text-center py-8">
              <CSpinner />
              <p className="text-gray-600 dark:text-gray-400 mt-2">Loading associated locations...</p>
            </div>
          ) : locationsError ? (
            <div className="text-center py-8">
              <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-4xl mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400">Failed to load associated locations</p>
            </div>
          ) : associatedLocations && associatedLocations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {associatedLocations.map((location) => (
                <div
                  key={location.locationId}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => navigate(`/dashboard/locations/${location.locationId}`)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">
                      {location.name || "Unnamed Location"}
                    </h3>
                    <FaMapMarkerAlt className="text-purple-500" />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {formatAddress(location)}
                  </p>
                  
                  {location.locationType && (
                    <div className="flex items-center gap-2 mb-3">
                      <FaTag className="text-blue-500 text-xs" />
                      <span className="text-xs text-gray-600">{location.locationType}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-1">
                    {location.keywords && location.keywords.length > 0 ? (
                      location.keywords.slice(0, 3).map((kw, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No keywords</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaMapMarkerAlt className="text-gray-300 text-4xl mx-auto mb-4" />
              <p className="text-gray-500">No locations associated with this contact.</p>
              <p className="text-sm text-gray-400 mt-2">
                Edit the contact to add associated locations.
              </p>
            </div>
          )}
        </Paper>
      </div>
    </>
  );
}
