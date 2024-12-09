import SidebarItem from "../sideBarItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { SearchBar } from "../searchBar";
import { startLoadingCharacters } from "../../../store/character/thunks";
import { apolloClient } from "../../../apollo/apolloClient";
import { sortCharacters } from "../../../store/character/characterSlice";
import clsx from "clsx";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  //Get filteredCharacters
  const filteredCharacters = useAppSelector(
    (state) => state.character.characters
  );

  // favorite and nonFavorite characters
  const favoriteCharacters = filteredCharacters.filter(
    (character) => character.isFavorite
  );
  const nonFavoriteCharacters = filteredCharacters.filter(
    (character) => !character.isFavorite
  );

  const sortOrder = useAppSelector((state) => state.character.sort);
  const { activeCharacter } = useAppSelector((state) => state.character);


  //Search function
  const handleSearch = (query: string) => {
    dispatch(startLoadingCharacters(apolloClient, { name: query }));
  };

  //Sort function
  const handleSort = (order: "A-Z" | "Z-A") => {
    // If reselect the same order, reset the sort
    if (sortOrder === order) {
      dispatch(sortCharacters(null));
    } else {
      dispatch(sortCharacters(order));
    }
  };

  return (
    <aside className={clsx("bg-gray-100 w-96 block sm:w-full pt-0.5", activeCharacter && "sm:hidden")}>
      <h2 className="font-bold pt-10 text-2xl px-6 pb-2">
        Rick and Morty list
      </h2>

      <SearchBar onSearch={(query: string) => handleSearch(query)} />

      {/* Botones de orden */}
      <div className="flex justify-end px-6">
        <span className="text-gray-400 mr-2 self-end">Sort:</span>
        <button
          className={`px-4 py-0.5 rounded-l-lg ${
            sortOrder === "A-Z" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSort("A-Z")}
        >
          A-Z
        </button>
        <button
          className={`px-4 py-0.5 rounded-r-lg ${
            sortOrder === "Z-A" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSort("Z-A")}
        >
          Z-A
        </button>
      </div>

      {favoriteCharacters.length > 0 && (
        <>
          {/* Lista de Favoritos */}
          <h3 className="px-6 font-semibold my-4">
            Starred Characters ({favoriteCharacters.length})
          </h3>
          <ul
            id="favorite"
            className="px-4 overflow-y-auto h-full max-h-[calc(35vh-2rem)] pb-4  scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-500"
          >
            {favoriteCharacters.map((character) => (
              <li
                key={character.id}
                className="hover:border-none  border-b border-[#E5E7EB]"
              >
                <SidebarItem
                  id={character.id}
                  name={character.name}
                  species={character.species}
                  image={character.image}
                  isFavorite={character.isFavorite}
                />
              </li>
            ))}
          </ul>
          <h3 className="px-6 font-semibold my-4">
            Characters ({nonFavoriteCharacters.length})
          </h3>
        </>
      )}

      {/* Lista de No Favoritos */}

      <ul
        id="nonFavorite"
        className={clsx(
          "px-4 overflow-y-auto   scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-500",
          favoriteCharacters.length > 0 ? "max-h-[calc(35vh-2rem)]" : "max-h-[calc(100vh-12rem)] mt-2 "
        )}
      >
        {nonFavoriteCharacters.map((character) => (
          <li
            key={character.id}
            className="hover:border-none  border-b border-[#E5E7EB]"
          >
            <SidebarItem
              id={character.id}
              name={character.name}
              species={character.species}
              image={character.image}
              isFavorite={character.isFavorite}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
