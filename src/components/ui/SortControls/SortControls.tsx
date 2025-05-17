import { Paper } from "@components/Container";

interface SortOption {
  label: string;
  value: string;
}

interface SortControlsProps {
  options: SortOption[];
  onSortChange: (value: string) => void;
  defaultValue?: string;
}

export default function SortControls({
  options,
  onSortChange,
  defaultValue,
}: SortControlsProps) {
  return (
    <Paper className="flex items-center gap-4 p-4 mb-4">
      <label className="text-sm font-medium text-gray-500">Sort by</label>
      <select
        className="p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSortChange(e.target.value)}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Paper>
  );
}
