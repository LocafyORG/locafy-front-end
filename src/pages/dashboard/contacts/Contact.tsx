import { getContactById } from "@api/contacts/ContactsApi";
import { Paper } from "@components/Container";
import { CSpinner, CAlert } from "@coreui/react";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect } from "react";

export function Contact() {
  const { contactId } = useParams();

  const {
    data: contact,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getContactById(String(contactId)), // Ensures it's always a string
    queryKey: ["contact", contactId],
    enabled: !!contactId, // Prevents running query if contactId is missing
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

  return (
    <>
      <DashboardPageHeader
        title={contact?.name || "Unknown Contact"}
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
        <p>Email: {contact?.email || "N/A"}</p>
        <p>Phone: {contact?.telNum || "N/A"}</p>
        <p>Notes: {contact?.notes || "No notes available"}</p>
      </Paper>
    </>
  );
}
