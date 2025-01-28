import { Paper } from "@components/Container";
import { CSpinner } from "@coreui/react";
import { DasboardPageHeader } from "@layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export function Contact() {
  const { contactId } = useParams();

  const { data: contact, isLoading } = useQuery({
    queryFn: () => getContactById(contactId || ""),
    queryKey: ["contact", { contactId }],
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center align-center">
        <CSpinner className="" />
      </div>
    );
  }

  return (
    <>
      <DasboardPageHeader
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
        <p>Email: {contact?.email}</p>
        <p>Phone: {contact?.telNum}</p>
        <p>Notes: {contact?.notes}</p>
      </Paper>
    </>
  );
}
