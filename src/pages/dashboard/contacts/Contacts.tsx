import { useEffect, useState } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import "@styles/pages/dashboard/Contacts.scss";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllContactsForUser } from "@api/contacts/ContactsApi";
import { useNavigate } from "react-router";
import { Contact } from "@api/interfaces/Contacts";

export function Contacts() {
  const [rows, setRows] = useState<ListPaneRow[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContacts = await getAllContactsForUser(); // Call the function to get contacts
        setContacts(fetchedContacts);
      } catch (err) {
        setError("Failed to fetch contacts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const rows: ListPaneRow[] = contacts.map((contact) => ({
      name: contact.name,
      telNum: contact.phone,
      email: contact.email,
      locationId: "",
    }));
    setRows(rows);
  }, [contacts]);

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
          Delete: (index) => {
            console.log("deleting: ", contacts[index]);
          },
          Edit: (index) => {
            console.log("editing: ", contacts[index]);
          },
        }}
        onRowClick={(index) => {
          console.log(contacts[index]);
          navigate(`${contacts[index].contactId}`);
        }}
      />
    </>
  );
}
