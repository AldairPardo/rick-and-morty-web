import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useAppDispatch } from "../hooks/redux";
import { startSelectCharacter, startToggleFavorite } from "../store/character/thunks";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import SidebarItem, { SidebarItemProps } from "../characters/components/sideBarItem";

// Mock Apollo Client
jest.mock("../apollo/apolloClient", () => ({
  apolloClient: {},
}));

// Mock Redux hooks and actions
jest.mock("../hooks/redux", () => ({
    useAppDispatch: jest.fn(),
}));

jest.mock("../store/character/thunks", () => ({
    startSelectCharacter: jest.fn(),
    startToggleFavorite: jest.fn(),
}));

describe("SidebarItem Component", () => {
    const mockDispatch = jest.fn();
    const defaultProps: SidebarItemProps = {
        id: 1,
        name: "Rick Sanchez",
        image: "https://example.com/rick.jpg",
        species: "Human",
        isFavorite: false,
    };

    beforeEach(() => {
        (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        jest.clearAllMocks();
    });

    it("renders the character's name, species, and image", () => {
        render(<SidebarItem {...defaultProps} />);

        expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
        expect(screen.getByText("Human")).toBeInTheDocument();
        expect(screen.getByAltText("Rick Sanchez-avatar")).toBeInTheDocument();
    });

    it("dispatches startSelectCharacter when clicking the item", () => {
        render(<SidebarItem {...defaultProps} />);

        const item = screen.getByText("Rick Sanchez");
        fireEvent.click(item);

        expect(mockDispatch).toHaveBeenCalledWith(
            startSelectCharacter({} as ApolloClient<NormalizedCacheObject>, {
                id: 1,
            })
        );
    });

    it("renders the favorite icon based on the isFavorite prop", () => {
        const { rerender } = render(<SidebarItem {...defaultProps} />);

        expect(screen.getByLabelText("Add to favorites")).toBeInTheDocument();

        rerender(<SidebarItem {...defaultProps} isFavorite={true} />);
        expect(
            screen.getByLabelText("Remove from favorites")
        ).toBeInTheDocument();
    });

    it("dispatches startToggleFavorite when clicking the favorite button", () => {
        render(<SidebarItem {...defaultProps} />);

        const favoriteButton = screen.getByLabelText("Add to favorites");
        fireEvent.click(favoriteButton);

        expect(mockDispatch).toHaveBeenCalledWith(
            startToggleFavorite({} as ApolloClient<NormalizedCacheObject>, {
                id: 1,
            })
        );
    });
});
