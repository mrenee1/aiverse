import React, { useState } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

// Electron exposes window.electronAPI via preload.js; use HashRouter there
// because the file:// protocol doesn't support the History API.
const Router = window.electronAPI ? HashRouter : BrowserRouter;
import styled, { createGlobalStyle } from 'styled-components';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import ToolDetailPage from './pages/ToolDetailPage';
import Footer from './components/Footer';
import { ToolsProvider } from './contexts/ToolsContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea, select {
    font-family: 'Inter', sans-serif;
    outline: none;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  padding-top: 70px; // Account for fixed navigation
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 280px; // Account for sidebar
  transition: margin-left 0.3s ease;

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <ToolsProvider>
        <GlobalStyle />
        <AppContainer>
          <Navigation />
          <MainContent>
            <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <ContentArea>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tools/:id" element={<ToolDetailPage />} />
              </Routes>
            </ContentArea>
          </MainContent>
          <Footer />
        </AppContainer>
      </ToolsProvider>
    </Router>
  );
}

export default App;
