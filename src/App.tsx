import React from "react";
import HomePage from "./pages/HomePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CharacterPage from "./pages/CharacterPage";
import GlobalStyle from "./globalStyles";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const App: React.FC = () => {
  return (
    <Container className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:id" element={<CharacterPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
