import { Navigate, Route, Routes } from "react-router-dom";
import { CharactersPage } from "../pages/CharactersPage";
import { useAppDispatch } from "../../hooks/redux";
import {
    useApolloClient,
    ApolloClient,
    NormalizedCacheObject,
} from "@apollo/client";
import { useEffect } from "react";
import { startLoadingCharacters } from "../../store/character/thunks";

export const CharactersRoutes = () => {
    const dispatch = useAppDispatch();
    const apolloClient =
        useApolloClient() as ApolloClient<NormalizedCacheObject>;

    useEffect(() => {
        dispatch(startLoadingCharacters(apolloClient));
    }, [dispatch, apolloClient]);

    return (
        <Routes>
            <Route path="/" element={<CharactersPage />} />{" "}
            {/* Página de personajes principal */}
            {/* Esta ruta se asegura de redirigir cualquier ruta no definida hacia "/" */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
