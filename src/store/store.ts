import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { characterSlice } from "./character/characterSlice";

export const store = configureStore({
    reducer: {
        character: characterSlice.reducer,
    },
});

// Tipos globales
export type RootState = ReturnType<typeof store.getState>; // Tipo del estado global
export type AppDispatch = typeof store.dispatch; // Tipo del dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>; // Tipo para los thunks
