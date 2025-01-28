import { useState } from "react";
import { ContactInput } from "@api/interfaces/Contacts";
import { createContact } from "@api/contacts/ContactsApi";
import { DashboardPageHeader } from "@layouts/DashboardLayout";

export function AddContact() {
  const [contact, setContact] = useState<ContactInput>({
    name: "",
    description: "",
    phone: "",
    email: "",
    notes: "",
    assocLocationIds: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting contact:", contact);
    createContact(contact, "inputid");
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardPageHeader
              title="Add New Contact"
            />

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description:</label>
            <input
              type="text"
              name="description"
              value={contact.description}
              onChange={handleChange}
              required
              className="w-full p-5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Add Contact
          </button>
        </form>
      </div>

      <div className="bg-gray-100 shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-2">Additional Information</h3>
        <p className="text-gray-600">
          You can add notes or extra details about the contact here.
        </p>
      </div>
    </div>
  );
}
