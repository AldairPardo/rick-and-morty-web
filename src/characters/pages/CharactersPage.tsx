import { CharacterDetailView } from "../views/CharacterDetailView";
import Layout from "../layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CommentSection from "../components/comments";
import EmptyState from "../views/emptyState";
import { setActiveCharacter } from "../../store/character/characterSlice";

export const CharactersPage = () => {
    const dispatch = useAppDispatch();

    // Selección del estado desde Redux
    const { activeCharacter } = useAppSelector(
        (state) => state.character
    );

    const handleClose = () => {
        dispatch(setActiveCharacter(null));
      };

    return (
        <Layout>
            {/* Renderiza la vista según si hay un personaje activo */}
            {activeCharacter ? (
                <>
                    <CharacterDetailView character={activeCharacter} onClose={handleClose} />
                    <CommentSection />
                </>
            ) : (
                <>
                <EmptyState />
                </>
            )}
        </Layout>
    );
};
