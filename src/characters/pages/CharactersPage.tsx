import { useDispatch, useSelector } from "react-redux";
import { CharacterDetailView } from "../views/CharacterDetailView";
import Layout from "../layout";

export const CharactersPage = () => {
    // const dispatch = useDispatch();

    // Selección del estado desde Redux
    const { isSaving, activeCharacter } = useSelector(
        (state: any) => state.character
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
