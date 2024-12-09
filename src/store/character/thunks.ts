import { AppThunk } from "../store";
import { ADD_COMMENT, FILTER_CHARACTERS, GET_CHARACTER_BY_ID, TOGGLE_FAVORITE } from "../../graphql/queries";
import { markAsFavorite, setActiveCharacter, setCharacters, updateCharacterComments } from "./characterSlice";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export const startLoadingCharacters =
    (apolloClient: ApolloClient<NormalizedCacheObject>, filterVariable?: { name: string }): AppThunk =>
    async (dispatch) => {
        try {
            const { data } = await apolloClient.query({
                query: FILTER_CHARACTERS,
                variables: filterVariable ? { name: filterVariable.name } : {},
            });

            if (data && data.filterCharacters) {
                dispatch(setCharacters(data.filterCharacters));
            }
        } catch (error) {
            console.error("Error al cargar los personajes:", error);
        }
    };

export const startSelectCharacter =
(apolloClient: ApolloClient<NormalizedCacheObject>, { id }: { id: number }): AppThunk =>
    async (dispatch) => {
        try {
            console.log('va a peticion')
            const { data } = await apolloClient.query({
                query: GET_CHARACTER_BY_ID,
                variables: {
                    getCharacterByIdId: id,
                },
            });
            console.log(data.getCharacterById);
            if (data && data.getCharacterById) {
                dispatch(setActiveCharacter(data.getCharacterById));
            }
        } catch (error) {
            console.error("Error al cargar los personajes:", error);
        }
    };

export const startToggleFavorite =
(apolloClient: ApolloClient<NormalizedCacheObject>, { id }: { id: number }): AppThunk =>
    async (dispatch) => {
        try {
            await apolloClient.mutate({
                mutation: TOGGLE_FAVORITE,
                variables: {
                    characterId: id,
                },
            });

            dispatch(markAsFavorite(id));

        } catch (error) {
            console.error("Error al marcar favorito:", error);
        }
    };

export const startNewComment = 
(apolloClient: ApolloClient<NormalizedCacheObject>, { id, comment }: { id:number, comment: string  }): AppThunk =>
    async (dispatch) => {
        try {
            console.log('se va a crear un nuevo comentario',{
                characterId: id,
                comment: comment,
            });
            const { data } = await apolloClient.mutate({
                mutation: ADD_COMMENT,
                variables: {
                    characterId: id,
                    comment: comment,
                },
            });
            console.log(data);
            dispatch(updateCharacterComments(data.addComment));
        } catch (error) {
                console.error("Error al crear un nuevo comentario:", error);
        }
    };