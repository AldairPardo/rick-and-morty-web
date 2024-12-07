import { Navigate, Route, Routes } from "react-router-dom";
import { CharactersPage } from "../pages/CharactersPage";

export const CharactersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CharactersPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
