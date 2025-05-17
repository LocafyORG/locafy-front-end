import { useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { getContactById, getLocationByContact } from "@api/contacts/ContactsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { Paper } from "@components/Container";
import { CSpinner, CAlert } from "@coreui/react";

export function Contact() {
  const { contactId } = useParams();

  const {
    data: contact,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: () => getContactById(String(contactId)),
    enabled: !!contactId,
  });

  const {
    data: sharedLocations,
    isLoading: isLoadingSharedLocations,
    error: sharedLocationsError,
  } = useQuery({
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

  return (
    <>
      <DashboardPageHeader
        title={contact.name || "Unnamed Contact"}
        buttons={[
          {
            children: "SHARE",
            onClick: () => {},
          },
          {
            children: "EDIT CONTACT",
            onClick: () => {},
          },
        ]}
      />

      <Paper>
        <p>Email: {contact.email || "N/A"}</p>
        <p>Phone: {contact.telNum || "N/A"}</p>
        <p>Notes: {contact.notes || "No notes available"}</p>
      </Paper>

      {/* Shared Locations Section */}
      <Paper className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Shared Locations</h2>

        {isLoadingSharedLocations ? (
          <CSpinner />
        ) : sharedLocationsError ? (
          <CAlert color="danger">Failed to load shared locations.</CAlert>
        ) : sharedLocations?.length ? (
          <ul className="space-y-2">
            {sharedLocations.map((location) => (
              <li key={location.locationId} className="border-b pb-2">
                <p className="font-medium">{location.name}</p>
                <p className="text-sm text-gray-600">
                  Type: {location.locationType} <br />
                  Keywords: {location.keywords.join(", ") || "None"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No shared locations found for this contact.</p>
        )}
      </Paper>
    </>
  );
}
