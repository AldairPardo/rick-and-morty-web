import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  isFavorite: boolean;
  comments: Comment[];
}

export interface Comment {
  id: number;
  characterId: number;
  comment: string;
  createdAt: string;
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
        state.characters[characterIndex].isFavorite = !state.characters[characterIndex].isFavorite;
        state.defaultCharacters = state.characters;
      }
      if(state.activeCharacter && state.activeCharacter.id === action.payload) {
        state.activeCharacter.isFavorite = !state.activeCharacter.isFavorite
      }
    },
    updateCharacterComments: (state, action: PayloadAction<Character>) => {
      state.activeCharacter = action.payload;
    }
  },
});

export const { setCharacters, setActiveCharacter, sortCharacters, markAsFavorite, updateCharacterComments } =
  characterSlice.actions;

export default characterSlice.reducer;
