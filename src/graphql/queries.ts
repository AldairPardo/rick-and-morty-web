import { gql } from "@apollo/client";

export const FILTER_CHARACTERS = gql`
    query FilterCharacters(
        $name: String
        $status: String
        $species: String
        $gender: String
        $origin: String
    ) {
        filterCharacters(
            name: $name
            status: $status
            species: $species
            gender: $gender
            origin: $origin
        ) {
            id
            name
            species
            origin
            gender
            status
            isFavorite
            image
        }
    }
`;

export const GET_CHARACTER_BY_ID = gql`
    query GetCharacterById($getCharacterByIdId: Int!) {
        getCharacterById(id: $getCharacterByIdId) {
            id
            name
            image
            status
            species
            isFavorite
            comments {
                comment
                createdAt
            }
        }
    }
`;

export const TOGGLE_FAVORITE = gql`
    mutation Mutation($characterId: Int!) {
        toggleFavorite(characterId: $characterId) {
            isFavorite
            id
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation AddComment($characterId: Int!, $comment: String!) {
        addComment(characterId: $characterId, comment: $comment) {
            id
            image
            name
            status
            species
            gender
            origin
            isFavorite
            comments {
            id
            characterId
            comment
            createdAt
            updatedAt
            }
        }
    }
`;