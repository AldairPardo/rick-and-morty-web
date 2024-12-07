import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

interface CharacterState {
  activeCharacter: Character | null;
  isLoading: boolean;
  characters: Character[];
}

const initialState: CharacterState = {
  activeCharacter: null,
  isLoading: true,
  characters: [],
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      // Carga la lista inicial de personajes
      state.characters = action.payload;
      state.isLoading = false;
    },
    setActiveCharacter: (state, action: PayloadAction<Character | null>) => {
      state.activeCharacter = action.payload;
    },
  },
});

export const { setCharacters, setActiveCharacter } =
  characterSlice.actions;

export default characterSlice.reducer;
