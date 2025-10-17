import { useEffect, useState } from "react";
import "@styles/pages/dashboard/Contacts.scss";
import { DashboardPageHeader } from "@layouts/DashboardLayout";
import { getAllContacts, deleteContact } from "@api/contacts/ContactsApi";
import { useNavigate } from "react-router";
import { Contact } from "@api/interfaces/ContactsDTO";
import { handleSignOut } from "@api/auth/authenticationAPI";
import { DASHBOARD } from "@constants/Routes";
import { FaUserCircle, FaPhone, FaEnvelope, FaPlus, FaTable, FaProjectDiagram } from "react-icons/fa";
import { LoadingSpinner, ErrorState, EmptyState, DataTable, type DataTableColumn } from "@components/ui";
import { ContactsOrgChartReactFlow } from "@components/ui/ContactsOrgChartReactFlow";

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                    viewMode === 'table'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FaTable /> TABLE
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                    viewMode === 'chart'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FaProjectDiagram /> CHART
                </button>
              </div>
            ),
            onClick: () => {},
            className: "flex items-center gap-2",
          },
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
        ) : viewMode === 'table' ? (
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
                onClick: (_, index) => handleDelete(index),
                variant: 'danger'
              }
            ]}
            emptyMessage="No contacts found"
            emptyIcon={<FaUserCircle className="text-gray-400 text-4xl" />}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Contacts Organization Chart</h3>
              <p className="text-sm text-gray-600">
                Click on any contact node to view details. Drag to rearrange the chart.
              </p>
            </div>
            <ContactsOrgChartReactFlow
              contacts={contacts}
              onContactSelect={(contact) => {
                if (contact?.contactId) {
                  navigate(`${contact.contactId}`);
                }
              }}
              allowLinking={true}
              persistData={true}
              storageKey="locafy-contacts-chart"
              onLinksChange={(links) => {
                console.log('Custom links:', links);
                // Links are automatically persisted to localStorage
                // You can also save these to your backend if needed
              }}
              className="w-full"
            />
          </div>
        )}
      </div>
    </>
  );
}
