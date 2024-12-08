import SidebarItem from "../sideBarItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { SearchBar } from "../filterBar";
import { startLoadingCharacters } from "../../../store/character/thunks";
import { apolloClient } from "../../../apollo/apolloClient";

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();

    //Get filteredCharacters
    const filteredCharacters = useAppSelector(
        (state) => state.character.characters
    );

    //Search function
    const handleSearch = (query: string) => {
        dispatch(startLoadingCharacters(apolloClient, { name: query }));
    };

    return (
        <aside className="bg-gray-100 w-[375px] pt-0.5 ">
            <h2 className="font-bold pt-10 text-2xl px-6 pb-2">
                Rick and Morty list
            </h2>
            
            <SearchBar onSearch={
                (query: string) => handleSearch(query)
            } />

            <ul className="px-4 overflow-y-auto h-[calc(100vh-150px)] scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-500">
                {filteredCharacters.map((character) => (
                    <div key={character.id}>
                        <li className="py-4 cursor-pointer hover:bg-[#EEE3FF] rounded-2xl px-5">
                            <SidebarItem
                                id={character.id}
                                name={character.name}
                                species={character.species}
                                image={character.image}
                            />
                        </li>
                        <hr className="w-full bg-black h-0.5" />
                    </div>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
