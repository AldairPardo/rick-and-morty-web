import SidebarItem from "../sideBarItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { SearchBar } from "../searchBar";
import { startLoadingCharacters } from "../../../store/character/thunks";
import { apolloClient } from "../../../apollo/apolloClient";
import { sortCharacters } from "../../../store/character/characterSlice";

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();

    //Get filteredCharacters
    const filteredCharacters = useAppSelector(
        (state) => state.character.characters
    );

    // Separar en favoritos y no favoritos
    const favoriteCharacters = filteredCharacters.filter((character) => character.isReferred);
    const nonFavoriteCharacters = filteredCharacters.filter((character) => !character.isReferred);

    const sortOrder = useAppSelector((state) => state.character.sort);

    //Search function
    const handleSearch = (query: string) => {
        dispatch(startLoadingCharacters(apolloClient, { name: query }));
    };

    //Sort function
    const handleSort = (order: 'A-Z' | 'Z-A') => {
        // If reselect the same order, reset the sort
        if (sortOrder === order) {
            dispatch(sortCharacters(null));
        } else {
            dispatch(sortCharacters(order));
        }
    };

    return (
        <aside className="bg-gray-100 w-[375px] pt-0.5">
            <h2 className="font-bold pt-10 text-2xl px-6 pb-2">
                Rick and Morty list
            </h2>
            
            <SearchBar onSearch={
                (query: string) => handleSearch(query)
            } />

            {/* Botones de orden */}
            <div className="flex justify-end px-6 py-4">
                <span className="text-gray-400 mr-2 self-end">Sort:</span>
                <button
                    className={`px-4 py-0.5 rounded-l-lg ${sortOrder === 'A-Z' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSort('A-Z')}
                >
                    A-Z
                </button>
                <button
                    className={`px-4 py-0.5 rounded-r-lg ${sortOrder === 'Z-A' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => handleSort('Z-A')}
                >
                    Z-A
                </button>
            </div>

            {/* Lista de Favoritos */}
            <h3 className="px-6 font-semibold mt-4">Starred Characters ({favoriteCharacters.length})</h3>
            <ul className="px-4 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-500">
                {favoriteCharacters.map((character) => (
                <li key={character.id} className="py-4 cursor-pointer hover:bg-[#EEE3FF] rounded-2xl px-5">
                    <SidebarItem
                    id={character.id}
                    name={character.name}
                    species={character.species}
                    image={character.image}
                    isReferred={character.isReferred}
                    />
                </li>
                ))}
            </ul>

            {/* Lista de No Favoritos */}
            <h3 className="px-6 font-semibold mt-4">Characters ({nonFavoriteCharacters.length})</h3>
            <ul className="px-4 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-500">
                {nonFavoriteCharacters.map((character) => (
                <li key={character.id} className="py-4 cursor-pointer hover:bg-[#EEE3FF] rounded-2xl px-5">
                    <SidebarItem
                    id={character.id}
                    name={character.name}
                    species={character.species}
                    image={character.image}
                    isReferred={character.isReferred}
                    />
                </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
