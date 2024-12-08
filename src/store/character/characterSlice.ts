import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  isReferred: boolean;
}

interface CharacterState {
  activeCharacter: Character | null;
  isLoading: boolean;
  characters: Character[];
  defaultCharacters: Character[];
  sort: string | null;
}

const initialState: CharacterState = {
  activeCharacter: null,
  isLoading: true,
  characters: [],
  defaultCharacters: [], // Copy for reset sorting
  sort: null,
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      // Carga la lista inicial de personajes
      state.characters = action.payload;
      state.defaultCharacters = action.payload;
      state.isLoading = false;
    },
    setActiveCharacter: (state, action: PayloadAction<Character | null>) => {
      state.activeCharacter = action.payload;
    },
    sortCharacters(state, action: PayloadAction<string | null>) {
      const order = action.payload;
      state.sort = order;
      if (order === null) {
        state.characters = state.defaultCharacters;
        return;
      }
      state.characters = state.characters.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (order === 'A-Z') return nameA.localeCompare(nameB);
        return nameB.localeCompare(nameA);
      });
    },
    markAsFavorite: (state, action: PayloadAction<number>) => {
      const characterIndex = state.characters.findIndex((character) => character.id === action.payload);
      if (characterIndex !== -1) {
        state.characters[characterIndex].isReferred = !state.characters[characterIndex].isReferred;
        state.defaultCharacters = state.characters;
      }
    },
  },
});

export const { setCharacters, setActiveCharacter, sortCharacters, markAsFavorite } =
  characterSlice.actions;

export default characterSlice.reducer;
