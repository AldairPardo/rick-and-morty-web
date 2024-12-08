

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Search or filter results", onSearch }: SearchBarProps) => {

    return (
        <div className="relative w-full max-w-sm">
            {/* Input de búsqueda */}
            <input
                type="text"
                placeholder={placeholder}
                className="w-full py-2 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={(e) => onSearch(e.target.value)}
            />
            {/* Icono de búsqueda */}
            <div className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400">
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
