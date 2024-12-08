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
    <div className="flex flex-col  rounded-lg   w-full ">
      {/* Botón para cerrar */}
      <button
        onClick={onClose}
        className="absolute top-2 cursor-pointer right-4 text-black hover:text-gray-600 focus:outline-none"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Imagen del personaje */}
      <div className="relative mb-4 w-[75px] h-[75px] md:mb-0 md:mr-6 ">
        <img
          src={character.image}
          alt={character.name}
          className="w-[75px] h-[75px] object-cover rounded-full"
        />
        {/* Ícono del corazón */}
        <div
          onClick={toggleFavorite}
          className="absolute  -bottom-1 -right-1 cursor-pointer h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-md"
        >
          {character.isFavorite ? <Heart /> : <HeartOutline />}
        </div>
      </div>

      {/* Detalles del personaje */}
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-gray-800 py-2">
          {character.name}
        </h2>
        <ul className="text-gray-600 text-base">
          <li className=" border-b py-4 border-[#E5E7EB] ">
            <span className="font-semibold">Specie</span> <br />{" "}
            {character.species}
          </li>
          <li className=" border-b py-4 border-[#E5E7EB] ">
            <span className="font-semibold">Status</span>
            <br /> {character.status}
          </li>
        </ul>
      </div>
    </div>
  );
};
