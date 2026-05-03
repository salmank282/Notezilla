/**
 *  @dependencies
 */
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/**
 * Pages
 */
import NewNotePage from "./pages/NewNotePage/NewNotePage";
import NotesPage from "./pages/NotesPage/NotesPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import WorkPage from "./pages/WorkPage/WorkPage";
import PersonalPage from "./pages/PersonalPage/PersonalPage";
import IdeasPage from "./pages/IdeasPage/IdeasPage";

/**
 * Additional Components
 */
import MainLayout from "./layouts/MainLayout";

const App: React.FC = () => { 
  const [searchNote, setSearchNote] = useState("");

  return (
    <>
      <MainLayout searchNote={searchNote} setSearchNote={setSearchNote}>
        <Routes>
          <Route path="/" element={<Navigate to="/notes" replace/>} />
          
          <Route path="/new-note" element={<NewNotePage/>}/>
          <Route path="/notes/:id" element={<NewNotePage/>}/>
          <Route path="/notes" element={<NotesPage searchNote={searchNote}/>} />
          <Route path="/favorites" element={<FavoritesPage/>}/>
          <Route path="/work" element={<WorkPage/>} />
          <Route path="/personal" element={<PersonalPage/>}></Route>
          <Route path="/ideas" element={<IdeasPage/>}></Route>

          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
