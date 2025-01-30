import { useEffect, useState } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import "@styles/pages/dashboard/Contacts.scss";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllContactsForUser } from "@api/contacts/ContactsApi";
import { useNavigate } from "react-router";

export function Contacts() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState<ListPaneRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await getAllContactsForUser(); // Call the function to get contacts
        const formattedContacts: ListPaneRow[] = fetchedContacts.map(
          (contact) => ({
            name: contact.name,
            telNum: contact.phone,
            email: contact.email,
            locationId: contact.locationIds.join(", "), // Assuming locationIds is an array
          }),
        );
        setContacts(formattedContacts);
      } catch (err) {
        setError("Failed to fetch contacts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <DashboardPageHeader
        title="Contacts"
        buttons={[
          {
            children: "ADD NEW CONTACT",
            onClick: () => {
              navigate("add");
            },
          },
        ]}
      />
      <ListPane2
        data={contacts}
        columnNames={{
          name: "Name",
          telNum: "Phone",
          email: "Email",
          locationId: "Locations",
        }}
        actions={{
          Delete: (index) => {
            console.log("deleting: ", contacts[index]);
          },
          Edit: (index) => {
            console.log("editing: ", contacts[index]);
          },
        }}
      />
    </>
  );
}
