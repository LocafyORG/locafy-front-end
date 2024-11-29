import { ReactNode, useState, useEffect } from "react"
import { Link } from "react-router"
import { CContainer, CTableBody, CTableHead, CTable, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react'
import './ListPane.css'

type ColumnData = string;
type ListPaneRowData = {[key: string]: ColumnData };
	
interface ListPaneProps {
	data: ListPaneRowData[],
	colNameArrangement: { [key: string]: string }
}

export default function ListPane({ data, colNameArrangement }: ListPaneProps) {
	const [keys] = useState<string[]>(Object.keys(colNameArrangement));
	const [headRowNames, setHeadRowNames] = useState<string[]>([]);

	useEffect(() => {
		// The `Object.key()` and `Object.values()` change the arrangement of the elements.
		// Using these functions for `keys` and `headRowNames` respectively may cause a misalignment.
		const names = keys.map((key) => colNameArrangement[key]);
		setHeadRowNames(names);
	}, [keys, colNameArrangement]);

	function processColData(dataArray: ListPaneRowData, key: string): ReactNode {
		const colData: string | undefined = dataArray[key]

		if (!colData) return <>{""}</>

		if (colData.length > 2 && colData.startsWith("`") && colData.endsWith("`")) {
			const regex = /\[([^\]]+)\]\(([^)]+)\)/;
			const match = colData.match(regex);
			const label = match?.[1];
			const url = match?.[2];

			if (!label || !url) {
				return <h1>Come on man!</h1>
			}

			return <Link to={url}>{label}</Link>
		}

		return <>{colData}</>
	}

	return <>
		<CContainer fluid className="list-pane">
			<CTable>
				<CTableHead>	
					{/* Head Row */}
					<CTableRow>
						{headRowNames.map((name, colKey) => (
							<CTableHeaderCell key={colKey}>{name}</CTableHeaderCell>
						))}
					</CTableRow>
				</CTableHead>	

				<CTableBody>
					{/* Data Rows */}
					{data.map((d, rowId) => (
						<CTableRow key={rowId}>
							{keys.map((key, colId) => (
								<CTableDataCell key={colId}>
									{processColData(d, key)}
								</CTableDataCell>
							))}	
						</CTableRow>
					))}
				</CTableBody>

			</CTable>
		</CContainer>
	</>
}
