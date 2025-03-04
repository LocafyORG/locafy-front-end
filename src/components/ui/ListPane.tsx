import React, { ReactNode, useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { cilOptions } from "@coreui/icons";
import { Paper } from "@components/Container";
import "@styles/components/ui/ListPane.scss";

export type ListPaneRow = { [key: string]: ReactNode };
type RowActions = { [key: string]: (index: number) => void };

interface ListPane2Props {
  data: ListPaneRow[];
  columnNames: { [key: string]: string };
  actions?: RowActions;
  action?: RowModalActions;
  onRowClick?: (index: number) => void;
}

type RowModalActions = { [key: string]: (index: number) => void };

export function ListPane2({
  data,
  columnNames,
  actions = {},
  onRowClick = () => {},
}: ListPane2Props): ReactNode {
  const [orderedKeys] = useState(Object.keys(columnNames));
  const [hasActions, setHasActions] = useState(false);

  useEffect(() => {
    setHasActions(actions !== undefined && Object.keys(actions).length > 0);
  }, [actions]);

  return (
    <>
      <Paper className="p-2 w-screen-xl hover:bg-gray-200 cursor-pointer">
        <table className="w-full">
          <thead className="">
            <tr>
              {orderedKeys.map((name, colKey) => (
                <th
                  className="bg-gray-50 p-3 first:rounded-l-lg last:rounded-r-lg"
                  key={colKey}
                >
                  {columnNames[name]}
                </th>
              ))}

              {hasActions ? (
                <th className="bg-gray-50 p-3 last:rounded-r-lg"></th>
              ) : null}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* Data Rows */}
            {data.map((d, rowId) => (
              <tr
                className="hover:bg-gray-100 transition-colors"
                key={rowId}
                onClick={() => {
                  onRowClick(rowId);
                }}
              >
                {orderedKeys.map((key, colId) => (
                  <td key={colId} className="p-3">
                    {d[key]}
                  </td>
                ))}
                {hasActions ? (
                  /* Append actions at the very end */
                  <td>
                    <ActionsMenu actions={actions} itemIndex={rowId} />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </>
  );
}

interface ActionsMenuProps {
  children?: ReactNode;
  itemIndex: number;
  actions: RowActions;
}

export function ActionsMenu({
  children,
  actions,
  itemIndex,
}: ActionsMenuProps) {
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
        {children ? children : <CIcon icon={cilOptions} />}
      </button>
      <Paper className={`p-1 menu-items ${menuToggled ? "" : "hidden"}`}>
        {Object.keys(actions)
          .sort()
          .map((actionName, index) => (
            <button key={index} onClick={() => actions[actionName](itemIndex)}>
              {actionName}
            </button>
          ))}
      </Paper>
    </div>
  );
}
