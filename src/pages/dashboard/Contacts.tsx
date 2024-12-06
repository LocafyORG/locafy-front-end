import { useState } from "react";
import { ListPane2, ListPaneRow } from '@components/ListPane'	;
import '@styles/pages/dashboard/Contacts.scss';

/**
 * `CTable` docs: `https://coreui.io/react/docs/components/table/`
 */
export default function Contacts() {
	const [contacts] = useState<ListPaneRow[]>([
		{
			name: "Doge",
			telNum: "+1-(800)-858-0085",
			email: "doge@cheemail.com",
			locationId: "`[4](/dashboard/locations?user=4)`"
		},
	]);

  return <>
		<h1>Contacts</h1>
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
        }
      }} />
	</>
}


