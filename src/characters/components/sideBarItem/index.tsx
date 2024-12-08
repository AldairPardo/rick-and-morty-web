import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { startSelectCharacter } from "../../../store/character/thunks";
import { apolloClient } from "../../../apollo/apolloClient";
// import {
//     setDeleteStarredCharacters,
//     setStarredCharacters,
// } from "../../store/characters";

export interface SidebarItemProps {
    id: number;
    name: string;
    image: string;
    species: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    id,
    name,
    image,
    species,
}) => {
    
    const dispatch = useAppDispatch();

    const onClickCharacter = () => {
        dispatch(startSelectCharacter(apolloClient, { id }))
    }

    return (
        <div className="flex items-center gap-4" onClick={ onClickCharacter }>
            <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={image}
                alt={`${name}-avatar`}
            />
            <div className="flex flex-col space-y-0 text-base">
                <b className="text-gray-900">{name}</b>
                <span className="text-gray-500">{species}</span>
            </div>
        </div>
    );
};

export default SidebarItem;
