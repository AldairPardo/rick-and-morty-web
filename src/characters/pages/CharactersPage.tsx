import { CharacterDetailView } from "../views/CharacterDetailView";
import Layout from "../layout";
import { useAppSelector } from "../../hooks/redux";

export const CharactersPage = () => {
    // const dispatch = useDispatch();

    // Selección del estado desde Redux
    const { activeCharacter } = useAppSelector(
        (state) => state.character
    );

    return (
        <Layout>
            {/* Renderiza la vista según si hay un personaje activo */}
            {activeCharacter ? (
                <CharacterDetailView character={activeCharacter} />
            ) : (
                <></>
            )}
        </Layout>
    );
};
