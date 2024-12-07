import SidebarItem from "../sideBarItem";
import { useAppSelector } from "../../../hooks/redux";

const Sidebar: React.FC = () => {
    const filteredCharacters = useAppSelector(
        (state) => state.character.characters
    );

    return (
        <aside className="bg-gray-100 w-[375px] pt-0.5">
            <h2 className="font-bold pt-10 text-2xl px-6 pb-2">
                Rick and Morty list
            </h2>
            <div>
              <input type="text" />
            </div>

            <ul className="px-4">
                {filteredCharacters.map((character) => (
                    <div key={character.id}>
                        <li className="py-4 cursor-pointer hover:bg-[#EEE3FF] rounded-2xl  px-5">
                            <SidebarItem
                                id={character.id}
                                name={character.name}
                                species={character.species}
                                image={character.image}
                            />
                        </li>
                        <hr className="w-full bg-black  h-0.5 " />
                    </div>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
