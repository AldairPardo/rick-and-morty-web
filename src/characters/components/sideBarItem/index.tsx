import React from "react";
import { Link } from "react-router-dom";
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
    // const [hoverItem, setHoverItem] = React.useState<boolean>(false);
    // const starredCharacters = useAppSelector(
    //     (state) => state.character.starredCharacters
    // );
    // const dispatch = useAppDispatch();

    // const toggleStarredCharacter = () => {
    //     if (starredCharacters?.includes(id)) {
    //         dispatch(setDeleteStarredCharacters(id));
    //     } else {
    //         dispatch(setStarredCharacters(id));
    //     }
    // };

    return (
        <div className="flex items-center gap-4">
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
