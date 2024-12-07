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
            isReferred
            image
        }
    }
`;
