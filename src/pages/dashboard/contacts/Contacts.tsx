import { useEffect, useState } from "react";
import "@styles/pages/dashboard/Contacts.scss";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllContacts, deleteContact } from "@api/contacts/ContactsApi";
import { useNavigate } from "react-router";
import { Contact } from "@api/interfaces/ContactsDTO";
import { handleSignOut } from "@api/auth/authenticationAPI";
import { DASHBOARD } from "@constants/Routes";
import { FaUserCircle, FaPhone, FaEnvelope, FaPlus } from "react-icons/fa";
import { LoadingSpinner, ErrorState, EmptyState, DataTable, type DataTableColumn } from "@components/ui";

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

  // Define table columns
  const columns: DataTableColumn[] = [
    {
      key: 'name',
      label: 'Name',
      icon: <FaUserCircle className="text-gray-400" />,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full text-lg font-bold text-gray-700">
            {(row.name as string)?.split(" ").map((n: string) => n[0]).join("") || "?"}
          </span>
          <span className="font-medium text-gray-800 group-hover:underline">
            {value as string}
          </span>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      icon: <FaPhone className="text-green-500" />,
      render: (value) => (value as string) || <span className="text-gray-400">N/A</span>
    },
    {
      key: 'email',
      label: 'Email',
      icon: <FaEnvelope className="text-blue-500" />,
      render: (value) => (value as string) || <span className="text-gray-400">N/A</span>
    }
  ];

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

  if (loading) {
    return <LoadingSpinner message="Loading contacts..." />;
  }
  
  if (error) {
    return (
      <ErrorState
        icon={<FaUserCircle className="text-red-500 text-4xl" />}
        title="Error loading contacts"
        error={error}
      />
    );
  }

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

      <div className="mt-6 mb-8">
        {contacts.length === 0 ? (
          <EmptyState
            icon={<FaUserCircle size={48} className="text-gray-400" />}
            title="No contacts found"
            description="Click NEW CONTACT to add your first contact."
          />
        ) : (
          <DataTable
            columns={columns}
            data={contacts as unknown as Record<string, unknown>[]}
            onRowClick={(contact) => {
              if (contact?.contactId) {
                navigate(`${contact.contactId}`);
              }
            }}
            actions={[
              {
                label: 'Edit',
                onClick: (contact) => {
                  if (contact?.contactId) {
                    navigate(`${DASHBOARD.EDIT_CONTACT}/${String(contact.contactId)}`);
                  }
                },
                variant: 'secondary'
              },
              {
                label: 'Delete',
                onClick: (contact, index) => handleDelete(index),
                variant: 'danger'
              }
            ]}
            emptyMessage="No contacts found"
            emptyIcon={<FaUserCircle className="text-gray-400 text-4xl" />}
          />
        )}
      </div>
    </>
  );
}
