
const SearchInput = () => {
  return (
    <div className="m-4 mb-6">
      {/* Input field for search, with a placeholder 'Search users...' */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-60 py-4 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 bg-white h-10 cursor-default"
        readOnly // Keeps the input non-editable
      />
    </div>
  );
};

export default SearchInput;
