import { apolloClient } from "../../apollo/apolloClient";
import { Heart } from "../../assets/heart";
import { HeartOutline } from "../../assets/heartOutline";
import { useAppDispatch } from "../../hooks/redux";
import { Character } from "../../store/character/characterSlice";
import { startToggleFavorite } from "../../store/character/thunks";

export const CharacterDetailView = ({
    character,
    onClose,
}: {
    character: Character;
    onClose: () => void;
}) => {
    const dispatch = useAppDispatch();

    const toggleFavorite = () => {
        dispatch(startToggleFavorite(apolloClient, { id: character.id }));
    };

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
            {/* Botón para cerrar */}
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close"
            >
                ✕
            </button>

            {/* Imagen del personaje */}
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 relative">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full"
                />
                {/* Ícono del corazón */}
                <div
                    onClick={toggleFavorite}
                    className="absolute top-2 right-2 cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-md"
                >
                    {
                        character.isFavorite ? <Heart /> : <HeartOutline />
                    }
                </div>
            </div>

            {/* Detalles del personaje */}
            <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {character.name}
                </h2>
                <ul className="text-gray-600 text-lg space-y-2">
                    <li>
                        <span className="font-semibold">Specie:</span> {character.species}
                    </li>
                    <li>
                        <span className="font-semibold">Status:</span> {character.status}
                    </li>
                </ul>
            </div>
        </div>
    );
};
