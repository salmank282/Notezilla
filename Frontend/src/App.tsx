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
          <Route path="/" element={<Navigate to="/notes" replace />} />

          <Route path="/new-note" element={<NewNotePage />} />
          <Route path="/notes/:id" element={<NewNotePage />} />
          <Route
            path="/notes"
            element={<NotesPage searchNote={searchNote} />}
          />
          <Route
            path="/favorites"
            element={
              <NotesPage
                searchNote={searchNote}
                tagFilter="favorite"
                emptyMessage="No favorite notes available."
              />
            }
          />
          <Route
            path="/work"
            element={
              <NotesPage
                searchNote={searchNote}
                tagFilter="work"
                emptyMessage="No work notes available."
              />
            }
          />
          <Route
            path="/personal"
            element={
              <NotesPage
                searchNote={searchNote}
                tagFilter="personal"
                emptyMessage="No personal notes available."
              />
            }
          ></Route>
          <Route
            path="/ideas"
            element={
              <NotesPage
                searchNote={searchNote}
                tagFilter="ideas"
                emptyMessage="No ideas notes available."
              />
            }
          ></Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export default App;
