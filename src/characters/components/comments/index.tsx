import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { startNewComment } from "../../../store/character/thunks";
import { apolloClient } from "../../../apollo/apolloClient";

const CommentSection: React.FC = () => {
  const dispatch = useAppDispatch();
  //Get active character
  const activeCharacter = useAppSelector(
    (state) => state.character.activeCharacter
  );

  const [newComment, setNewComment] = useState<string>("");

  const handleCommentSubmit = () => {
    if (newComment.trim() === "" || !activeCharacter) return;
    dispatch(startNewComment(apolloClient,{ id: activeCharacter.id, comment: newComment }));
    setNewComment(""); // Clear the input field
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Título */}
      <h3 className="text-2xl font-semibold text-gray-800">Comments</h3>

      {/* Sección para añadir comentario */}
      <div className="flex flex-col space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="p-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Añadir un comentario..."
          rows={1}
        />
        <button
          onClick={handleCommentSubmit}
          className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-400 focus:outline-none"
        >
          Comment
        </button>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {activeCharacter?.comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Usuario Anónimo</span>
                <span className="text-sm text-gray-500">
                {new Date(+comment.createdAt).toLocaleString("es-CO", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
                </span>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
