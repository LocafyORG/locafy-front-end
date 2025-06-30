import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  getContactById,
  getLocationByContact,
} from "@api/contacts/ContactsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { Paper } from "@components/Container";
import { CSpinner, CAlert } from "@coreui/react";

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

  const {
    data: sharedLocations,
    isLoading: isLoadingSharedLocations,
    error: sharedLocationsError,
  } = useQuery<Location[], Error>({
    queryKey: ["shared-locations", contactId],
    queryFn: () => getLocationByContact(String(contactId)),
    enabled: !!contactId,
  });

  useEffect(() => {
    if (!contactId) {
      console.warn("No contact ID found in URL.");
    }
  }, [contactId]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CAlert color="danger">Failed to load contact details.</CAlert>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CAlert color="warning">Contact not found.</CAlert>
      </div>
    );
  }

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleString() : "N/A";

  return (
    <>
      <DashboardPageHeader
        title={contact.name || "Unnamed Contact"}
        buttons={[
          {
            children: "SHARE",
            onClick: () => {
              alert("Share feature coming soon!");
            },
          },
          {
            children: "EDIT CONTACT",
            onClick: () => {
              navigate(`/contacts/edit/${contactId}`);
            },
          },
        ]}
      />

      <Paper>
        <p><strong>Name:</strong> {contact.name || "N/A"}</p>
        <p><strong>Description:</strong> {contact.description || "No description"}</p>
        <p><strong>Email:</strong> {contact.email || "N/A"}</p>
        <p><strong>Phone:</strong> {contact.phone || "N/A"}</p>
        <p><strong>Notes:</strong> {contact.notes || "No notes available"}</p>
        <p><strong>Uploaded At:</strong> {formatDate(contact.uploadedAt)}</p>
        <p><strong>Last Updated:</strong> {formatDate(contact.lastUpdated)}</p>
      </Paper>

      <Paper className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Shared Locations</h2>

        {isLoadingSharedLocations ? (
          <CSpinner />
        ) : sharedLocationsError ? (
          <CAlert color="danger">Failed to load shared locations.</CAlert>
        ) : sharedLocations && sharedLocations.length > 0 ? (
          <ul className="space-y-2">
            {sharedLocations.map((location) => (
              <li key={location.locationId} className="border-b pb-2">
                <p className="font-medium">{location.name}</p>
                <p className="text-sm text-gray-600">
                  Type: {location.locationType} <br />
                  Keywords: {location.keywords?.join(", ") || "None"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No shared locations found for this contact.
          </p>
        )}
      </Paper>
    </>
  );
}
