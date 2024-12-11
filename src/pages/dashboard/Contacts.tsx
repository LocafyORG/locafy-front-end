import { useState } from "react";
import { ListPane2, ListPaneRow } from "@components/ui/ListPane";
import "@styles/pages/dashboard/Contacts.scss";
import { DasboardPageHeader } from "@layouts/DashboardLayout";

/**
 * `CTable` docs: `https://coreui.io/react/docs/components/table/`
 */
export default function Contacts() {
  const [contacts] = useState<ListPaneRow[]>([
    {
      name: "Doge",
      telNum: "+1-(800)-858-0085",
      email: "doge@cheemail.com",
      locationId: "`[4](/dashboard/locations?user=4)`",
    },
  ]);

  return (
    <>
      <DasboardPageHeader
        title="Contacts"
        buttons={[{ children: "ADD NEW CONTACT" }]}
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
            console.log("deleting: ", index);
          },
          Edit: (index) => {
            console.log("editing: ", contacts[index]);
          },
        }}
      />
    </>
  );
}
