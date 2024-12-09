import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchBar } from "../characters/components/searchBar";

describe("SearchBar Component", () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the SearchBar with the default placeholder", () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText(
            "Search or filter results"
        );
        expect(inputElement).toBeInTheDocument();
    });

    it("renders the SearchBar with a custom placeholder", () => {
        const customPlaceholder = "Buscar datos";
        render(
            <SearchBar
                placeholder={customPlaceholder}
                onSearch={mockOnSearch}
            />
        );
        const inputElement = screen.getByPlaceholderText(customPlaceholder);
        expect(inputElement).toBeInTheDocument();
    });

    it("calls onSearch with the correct value when typing", () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText(
            "Search or filter results"
        );

        fireEvent.change(inputElement, { target: { value: "Test query" } });
        expect(mockOnSearch).toHaveBeenCalledWith("Test query");
    });

    it("does not throw an error when no placeholder is provided", () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText(
            "Search or filter results"
        );
        expect(inputElement).toBeInTheDocument();
    });
});
