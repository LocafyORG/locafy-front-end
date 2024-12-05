import { useState } from "react"
import ListPane from '@components/ListPane/ListPane'	
import './Contacts.css'

/**
 * `CTable` docs: `https://coreui.io/react/docs/components/table/`
 */
export default function Contacts() {
	const [contacts] = useState<{[key:string]:string}[]>([
		{
			// Good example
			name: "Doge",
			telNum: "+1-(800)-858-0085",
			email: "doge@cheemail.com",
			locationId: "`[4](/dashboard/locations?user=4)`"
		},
		{
			name: "Cheems",
			telNum: "+1-(800)-858-0085",
			age: "22",		// Ignored because 'age' is not specified in 'colNameArrangement'
			email: "cheems_is_here@cheemail.com",
			// Location is missing here so is, therefore, not rendered
		},
	]);

  return <>
		<h1>Contacts</h1>
		<ListPane data={contacts} colNameArrangement={{
				name: "Name",
				telNum: "Phone",
				email: "Email",
				locationId: "Locations",
			}} />
	</>
}


