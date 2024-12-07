export default function SortControls() {
  return (
    <>
      <div className="flex items-center space-x-2 p-4 rounded-lg shadow-md bg-gray-50">
        <span className="text-sm font-medium text-gray-500">Sort by Date</span>
        <select className="p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="newest">Newest - Oldest</option>
          <option value="oldest">Oldest - Newest</option>
        </select>
      </div>
    </>
  );
}
