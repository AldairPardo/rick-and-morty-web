interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export const SearchBar = ({
  placeholder = "Search or filter results",
  onSearch,
}: SearchBarProps) => {
  return (
    <div className="relative p-4 w-full max-w-sm">
      <div className="absolute top-1/2 transform -translate-y-1/2 left-6 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
          />
        </svg>
      </div>
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-2 px-8 rounded-lg border-none  shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onChange={(e) => onSearch(e.target.value)}
      />
      {/* filtro  */}
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
          />
        </svg>
      </div>
    </div>
  );
};
