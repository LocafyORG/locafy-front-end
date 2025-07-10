import { useEffect, useState } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import "@styles/pages/dashboard/Contacts.scss";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllContacts, deleteContact } from "@api/contacts/ContactsApi";
import { useNavigate } from "react-router";
import { Contact } from "@api/interfaces/ContactsDTO";
import { handleSignOut } from "@api/auth/authenticationAPI";
import { DASHBOARD } from "@constants/Routes";
import { FaUserCircle, FaPhone, FaEnvelope, FaPlus } from "react-icons/fa";

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
  }, [navigate]);

  // Convert contacts to rows for ListPane2
  const rows: ListPaneRow[] = contacts.map((contact) => ({
    name: contact.name,
    telNum: contact.phone,
    email: contact.email,
    locationId: "",
    _avatar:
      contact.name
        ?.split(" ")
        .map((n) => n[0])
        .join("") || "?",
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-600 text-lg">
        {error}
      </div>
    );

  return (
    <>
      <DashboardPageHeader
        title="Contacts"
        buttons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaPlus /> NEW CONTACT
              </span>
            ),
            onClick: () => {
              navigate("add");
            },
            className:
              "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition shadow",
          },
        ]}
      />

      <div className="mt-6 mb-8 bg-white shadow rounded-lg p-4">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-500">
            <FaUserCircle size={48} className="mb-2" />
            <div className="text-lg">No contacts found.</div>
            <div className="text-sm">
              Click <span className="font-semibold">NEW CONTACT</span> to add
              your first contact.
            </div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">
                  <FaPhone className="inline mr-1 text-green-500" />
                  Phone
                </th>
                <th className="px-4 py-2 text-left">
                  <FaEnvelope className="inline mr-1 text-blue-500" />
                  Email
                </th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, idx) => (
                <tr
                  key={contact.contactId}
                  className="hover:bg-blue-50 transition cursor-pointer group"
                  onClick={() => {
                    if (contact?.contactId) {
                      navigate(`${contact.contactId}`);
                    }
                  }}
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full text-lg font-bold text-gray-700">
                      {contact.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "?"}
                    </span>
                    <span className="font-medium text-gray-800 group-hover:underline">
                      {contact.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {contact.phone || (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {contact.email || (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (contact?.contactId) {
                          navigate(
                            `${DASHBOARD.EDIT_CONTACT}/${String(contact.contactId)}`,
                          );
                        }
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(idx);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
