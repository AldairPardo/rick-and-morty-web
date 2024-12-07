import { AppThunk } from "../store";
import { FILTER_CHARACTERS } from "../../graphql/queries";
import { setCharacters } from "./characterSlice";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export const startLoadingCharacters =
    (apolloClient: ApolloClient<NormalizedCacheObject>): AppThunk =>
    async (dispatch) => {
        try {
            const { data } = await apolloClient.query({
                query: FILTER_CHARACTERS,
            });

            if (data && data.filterCharacters) {
                dispatch(setCharacters(data.filterCharacters));
            }
        } catch (error) {
            console.error("Error al cargar los personajes:", error);
        }
    };
