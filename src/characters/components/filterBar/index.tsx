import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (name: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Llamar al filtro por nombre
    };

    return (
        <div className="flex items-center bg-gray-200 rounded-md px-4 py-2 mb-4">
            <input
                type="text"
                placeholder="Search or filter results"
                value={searchTerm}
                onChange={handleInputChange}
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
            <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => {}}
                disabled
            >
                {/* Ícono del filtro */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6 6V20l-4 2v-9.293l-6-6A1 1 0 013 6V4z"
                    />
                </svg>
            </button>
        </div>
    );
};

export default SearchBar;
