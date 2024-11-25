import { useState } from "react";
import Card from "../../../components/Card/Card.tsx";
import SortControls from '@components/SortControls/SortControls'
import Cheems from '@assets/img/under-development.webp'
import './Productions.css'

function Productions() {
  const [sortKey, setSortKey] = useState("title");

  const testData = [
    { title: "Location 1", description: "A beautiful beach with clear water." },
    { title: "Location 2", description: "A bustling city center with skyscrapers." },
    { title: "Location 3", description: "A serene mountain landscape." },
  ];

  // Sort data based on the selected key
  const sortedData = [...testData].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  return <>
		<h1>Productions</h1>
		<a className="waves-effect waves-light btn float-right">Add a new production</a>

		<SortControls onSortChange={(value) => setSortKey(value)} />
		<div className="card-container">
			{sortedData.map((item, index) => (
				<Card key={index} image={Cheems} title={item.title} description={item.description} />
			))}
		</div>
	</>
}

export default Productions;
