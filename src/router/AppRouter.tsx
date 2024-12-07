import { createBrowserRouter } from "react-router-dom";
import { CharactersRoutes } from "../characters/routes/CharactersRoutes";

export const AppRouter = createBrowserRouter([
	{
		path: "/",
		element: <CharactersRoutes />,
	}
]);