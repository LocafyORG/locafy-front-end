import React, { ReactNode, useState, useEffect } from "react";
import {
  CContainer,
  CTableBody,
  CTableHead,
  CTable,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilOptions } from "@coreui/icons";
import "@styles/components/ListPane.scss";

// This is fucking unhinged but damn it works well
export type ListPaneRow = { [key: string]: ReactNode };
type RowActions = { [key: string]: (index: number) => void };

interface ListPane2Props {
  data: ListPaneRow[];
  columnNames: { [key: string]: string };
  actions?: RowActions;
  action?: RowModalActions;
}

type RowModalActions = { [key: string]: (index: number) => void };

export function ListPane2({
  data,
  columnNames,
  actions = {},
}: ListPane2Props): ReactNode {
  const [orderedKeys] = useState(Object.keys(columnNames));
  const [hasActions, setHasActions] = useState(false);

  useEffect(() => {
    setHasActions(actions !== undefined && Object.keys(actions).length > 0);
  }, [actions]);

  return (
    <>
      <CContainer fluid className="list-pane">
        <CTable>
          {/* Head Row */}
          <CTableHead>
            <CTableRow>
              {orderedKeys.map((name, colKey) => (
                <CTableHeaderCell key={colKey}>
                  {columnNames[name]}
                </CTableHeaderCell>
              ))}

              {/* I need a strong acid to wash my eyes with after looking at this syntax. Disgusting. */}
              {hasActions ? (
                /* Redundant space for the action button column */
                <CTableHeaderCell />
              ) : null}
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {/* Data Rows */}
            {data.map((d, rowId) => (
              <CTableRow key={rowId}>
                {orderedKeys.map((key, colId) => (
                  <CTableDataCell key={colId}>{d[key]}</CTableDataCell>
                ))}

                {hasActions ? (
                  /* Append actions at the very end */
                  <CTableDataCell>
                    <ActionsMenu actions={actions} itemIndex={rowId} />
                  </CTableDataCell>
                ) : null}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CContainer>
    </>
  );
}

interface ActionsMenuProps {
  itemIndex: number;
  actions: RowActions;
}

function ActionsMenu({ actions, itemIndex }: ActionsMenuProps) {
  const [menuToggled, setMenuToggled] = useState<boolean>(false);
  const toggleMenu = () => setMenuToggled((prev) => !prev);

  const closeMenu = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setMenuToggled(false);
    }
  };

  return (
    <div className="actions-menu" onBlur={closeMenu}>
      <button onClick={toggleMenu}>
        <CIcon icon={cilOptions} />
      </button>
      <CRow className={`menu-items ${menuToggled ? "" : "hidden"}`}>
        {Object.keys(actions)
          .sort()
          .map((actionName, index) => (
            <button key={index} onClick={() => actions[actionName](itemIndex)}>
              {actionName}
            </button>
          ))}
      </CRow>
    </div>
  );
}
