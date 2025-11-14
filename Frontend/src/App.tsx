/**
 *  @dependencies
 */
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/**
 * Pages
 */
import NotesPage from "./pages/NotesPage/NotesPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import TrashPage from "./pages/TrashPage/TrashPage";

/**
 * Additional Components
 */
import MainLayout from "./layouts/MainLayout";

const App: React.FC = () => {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/notes" replace/>} />

          <Route path="/notes" element={<NotesPage/>}/>
          <Route path="/favorites" element={<FavoritesPage/>}/>
          <Route path="/trash" element={<TrashPage/>} />

          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
