import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo/apolloClient";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRouter } from "./router/AppRouter";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <div className="h-screen overflow-hidden">
          <RouterProvider router={AppRouter} />
        </div>
      </ApolloProvider>
    </Provider>
  </StrictMode>
);
