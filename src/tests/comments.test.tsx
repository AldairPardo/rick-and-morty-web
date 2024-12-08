import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import CommentSection from "../characters/components/comments";
import { startNewComment } from "../store/character/thunks";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

// Mock Redux hooks and actions
jest.mock("../hooks/redux", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../store/character/thunks", () => ({
  startNewComment: jest.fn(),
}));

// Mock Apollo Client (if necessary)
jest.mock("../apollo/apolloClient", () => ({
  apolloClient: {},
}));

describe("CommentSection Component", () => {
  const mockDispatch = jest.fn();
  const mockActiveCharacter = {
    id: "1",
    comments: [
      { id: "c1", comment: "Primer comentario", createdAt: "1696190360000" },
    ],
  };

  beforeEach(() => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        character: { activeCharacter: mockActiveCharacter },
      })
    );
    jest.clearAllMocks();
  });

  it("renders the comment section title", () => {
    render(<CommentSection />);
    expect(screen.getByText(/comments/i)).toBeInTheDocument();
  });

  it("renders existing comments", () => {
    render(<CommentSection />);
    expect(screen.getByText("Primer comentario")).toBeInTheDocument();
  });

  it("updates the textarea value when typing", () => {
    render(<CommentSection />);
    const textarea = screen.getByPlaceholderText("Añadir un comentario...");
    fireEvent.change(textarea, { target: { value: "Nuevo comentario" } });
    expect((textarea as HTMLTextAreaElement).value).toBe("Nuevo comentario");
  });

  it("dispatches startNewComment and clears input on submit", () => {
    render(<CommentSection />);
    const textarea = screen.getByPlaceholderText("Añadir un comentario...");
    const button = screen.getByRole('button', { name: /comment/i });  // Updated query

    // Simulate typing
    fireEvent.change(textarea, { target: { value: "Nuevo comentario" } });
    expect((textarea as HTMLTextAreaElement).value).toBe("Nuevo comentario");

    // Simulate submitting the form
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledWith(
      startNewComment({} as ApolloClient<NormalizedCacheObject>, { id: 1, comment: "Nuevo comentario" })
    );
    expect((textarea as HTMLTextAreaElement).value).toBe("");
  });

  it("does not submit if the input is empty", () => {
    render(<CommentSection />);
    const button = screen.getByRole('button', { name: /comment/i });  // Updated query

    // Simulate clicking the button without text
    fireEvent.click(button);
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("does not submit if there is no active character", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        character: { activeCharacter: null },
      })
    );

    render(<CommentSection />);
    const textarea = screen.getByPlaceholderText("Añadir un comentario...");
    const button = screen.getByRole('button', { name: /comment/i });  // Updated query

    fireEvent.change(textarea, { target: { value: "Comentario inválido" } });
    fireEvent.click(button);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
