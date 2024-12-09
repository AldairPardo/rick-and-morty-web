import { CharacterDetailView } from "../views/CharacterDetailView";
import Layout from "../layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import CommentSection from "../components/comments";
import { setActiveCharacter } from "../../store/character/characterSlice";
import EmptyState from "../views/EmptyState";

export const CharactersPage = () => {
  const dispatch = useAppDispatch();

  const { activeCharacter } = useAppSelector((state) => state.character);

  const handleClose = () => {
    dispatch(setActiveCharacter(null));
  };

  return (
    <Layout>
      {/* Render if exists an active Character */}
      {activeCharacter ? (
        <div
          className="h-full w-full px-[100px] sm:px-6 py-4  bg-white overflow-y-auto lg:block  "
          style={{ boxShadow: " 0px 4px 60px 0px #0000000D" }}
        >
          <CharacterDetailView
            character={activeCharacter}
            onClose={handleClose}
          />
          <CommentSection />
        </div>
      ) : (
        <EmptyState />
      )}
    </Layout>
  );
};
