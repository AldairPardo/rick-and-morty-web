import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo/apolloClient";
import { CharactersPage } from "./characters/pages/CharactersPage";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <CharactersPage />,
  }
]);

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <div className="h-screen overflow-hidden">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  </StrictMode>
);
