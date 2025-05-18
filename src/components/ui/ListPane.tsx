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
      <Paper className="p-2 w-screen-xl">
        <table className="w-full">
          <thead>
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
            {data.map((d, rowId) => (
              <tr
                className="hover:bg-gray-100 transition-colors"
                key={rowId}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest(".actions-menu")) return;
                  onRowClick(rowId);
                }}
              >
                {orderedKeys.map((key, colId) => (
                  <td key={colId} className="p-3">
                    {d[key]}
                  </td>
                ))}
                {hasActions ? (
                  <td className="relative">
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

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setMenuToggled((prev) => !prev);
  };

  const closeMenu = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setMenuToggled(false);
    }
  };

  const handleActionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    actionName: string
  ) => {
    e.stopPropagation();
    actions[actionName](itemIndex);
    setMenuToggled(false);
  };

  return (
    <div
      className="actions-menu relative inline-block"
      onBlur={closeMenu}
      tabIndex={0}
    >
      <button
        onClick={toggleMenu}
        className="p-1 rounded hover:bg-gray-100 focus:outline-none"
      >
        {children ? children : <CIcon icon={cilOptions} />}
      </button>
      <Paper
        className={`absolute top-full right-0 z-50 mt-2 min-w-[8rem] bg-white shadow-lg rounded-md p-1 flex flex-col ${
          menuToggled ? "" : "hidden"
        }`}
      >
        {Object.keys(actions)
          .sort()
          .map((actionName, index) => (
            <button
              key={index}
              onClick={(e) => handleActionClick(e, actionName)}
              className="px-3 py-1 text-left hover:bg-gray-100 rounded"
            >
              {actionName}
            </button>
          ))}
      </Paper>
    </div>
  );
}
