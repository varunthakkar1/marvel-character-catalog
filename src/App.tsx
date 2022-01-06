import React from "react";
import HomePage from "./pages/home/HomePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CharacterPage from "./pages/character/CharacterPage";
import GlobalStyle from "./globalStyles";

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<CharacterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
