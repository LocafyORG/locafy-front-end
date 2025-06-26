import { useEffect, useState } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import "@styles/pages/dashboard/Contacts.scss";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllContacts, deleteContact } from "@api/contacts/ContactsApi";
import { useNavigate } from "react-router";
import { Contact } from "@api/interfaces/ContactsDTO";
import { handleSignOut } from "@api/auth/authenticationAPI";

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch contacts once on mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await getAllContacts();
        setContacts(fetchedContacts);
      } catch (err) {
        setError("Failed to fetch contacts.");
        console.error(err);
         if (err === "Unauthorized") {
                handleSignOut(navigate);
              }
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Convert contacts to rows for ListPane2
  const rows: ListPaneRow[] = contacts.map((contact) => ({
    name: contact.name,
    telNum: contact.phone,
    email: contact.email,
    locationId: "", // You can fill this if you have location info
  }));

  // Delete handler that removes the contact from state after deletion
  const handleDelete = async (index: number) => {
    const contact = contacts[index];
    if (!contact || !contact.contactId) return;

    try {
      await deleteContact(contact.contactId);
      setContacts((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Failed to delete contact:", err);
      setError("Failed to delete contact.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <DashboardPageHeader
        title="Contacts"
        buttons={[
          {
            children: "NEW CONTACT",
            onClick: () => {
              navigate("add");
            },
          },
        ]}
      />

      <ListPane2
        data={rows}
        columnNames={{
          name: "Name",
          telNum: "Phone",
          email: "Email",
          locationId: "Locations",
        }}
        actions={{
          Delete: handleDelete,
          Edit: (index) => {
            const contact = contacts[index];
            if (contact?.contactId) {
              navigate(`${contact.contactId}`);
            }
          },
        }}
        onRowClick={(index) => {
          const contact = contacts[index];
          if (contact?.contactId) {
            navigate(`${contact.contactId}`);
          }
        }}
      />
    </>
  );
}
