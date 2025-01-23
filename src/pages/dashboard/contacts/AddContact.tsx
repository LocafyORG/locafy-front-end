import { useState } from "react";
import { ContactInput } from "@api/interfaces/Contacts";
import { createContact } from "@api/contacts/ContactsApi";

export function AddContact() {
  const [contact, setContact] = useState<ContactInput>({
    name: "",
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
    createContact(contact, "inputid"); //fix owner ID
  };

  return (
    <div className="add-contact-form">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="telNum"
            value={contact.telNum}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Associated Location IDs:</label>
          <input
            type="text"
            name="assocLocationIds"
            value={contact.assocLocationIds.join(",")}
            onChange={(e) =>
              setContact({
                ...contact,
                assocLocationIds: e.target.value.split(",").map((id) => id.trim()),
              })
            }
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}
