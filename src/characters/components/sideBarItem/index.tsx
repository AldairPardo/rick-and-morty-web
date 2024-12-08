import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { startSelectCharacter, startToggleFavorite } from "../../../store/character/thunks";
import { apolloClient } from "../../../apollo/apolloClient";
import { Heart } from "../../../assets/heart";
import { HeartOutline } from "../../../assets/heartOutline";

// import {
//     setDeleteStarredCharacters,
//     setStarredCharacters,
// } from "../../store/characters";

export interface SidebarItemProps {
    id: number;
    name: string;
    image: string;
    species: string;
    isFavorite: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    id,
    name,
    image,
    species,
    isFavorite,
}) => {
    
    const dispatch = useAppDispatch();

    const onClickCharacter = () => {
        dispatch(startSelectCharacter(apolloClient, { id }))
    }

    const toggleFavorite = (id: number) => {
        dispatch(startToggleFavorite(apolloClient, { id }));
    };

    return (
        <div className="flex relative flex-col w-full py-1 group ">
            <div className="flex items-center gap-4" onClick={onClickCharacter}>
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
            
            {/* Botón de favorito */}
            <div
                onClick={() => toggleFavorite(id)}
                className="absolute right-1 top-3 bottom-0 cursor-pointer h-9 group w-9 z-10 flex items-center group-hover:bg-white rounded-full justify-center"
            >
               {
                isFavorite ? <Heart />: <HeartOutline />
               }
            </div>
        </div>
    );
};

export default SidebarItem;
