import { useAppDispatch } from "../../../hooks/redux";
import {
  startSelectCharacter,
  startToggleFavorite,
} from "../../../store/character/thunks";
import { apolloClient } from "../../../apollo/apolloClient";
import { Heart } from "../../../assets/heart";
import { HeartOutline } from "../../../assets/heartOutline";

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
    console.log('alla va')
    dispatch(startSelectCharacter(apolloClient, { id }));
  };

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(startToggleFavorite(apolloClient, { id }));
  };

  return (
    <div
      className="cursor-pointer relative flex flex-col w-full group py-4 px-5 hover:bg-[#EEE3FF] rounded-lg"
      onClick={onClickCharacter}
    >
      <div className="flex items-center gap-4">
        <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src={image}
          alt={`${name}-avatar`}
        />
        <div className="flex flex-col space-y-0 text-base">
          <b className="text-gray-900 font-semibold">{name}</b>
          <span className="text-gray-500 font-semibold">{species}</span>
        </div>
      </div>

      {/* Favorite button */}
      <div
        onClick={(e) => toggleFavorite(id, e)}
        className="absolute right-4 top-1/2 cursor-pointer transform -translate-y-1/2 h-9 group w-9 z-10 flex items-center group-hover:bg-white rounded-full justify-center"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? <Heart /> : <HeartOutline />}
      </div>
    </div>
  );
};

export default SidebarItem;

