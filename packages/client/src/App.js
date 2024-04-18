import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './containers/NavbarPage/Navbar';
import RetroPage from './containers/RetroPage/RetroPage';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';
import { RetroManagementPage } from './containers/RetroManagement/RetroManagementPage';
import CreateTeam from './containers/CreateTeamPage/CreateTeam';
import { PastRetroPage } from './containers/PastRetroPage/PastRetroPage';
import IndexPage from './containers/IndexPage/IndexPage';
import JoinRetroPage from './containers/JoinRetroPage/JoinRetroPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/CreateNewTeamPage" element={<CreateTeam />} />
          <Route path="/joinretro" element={<JoinRetroPage />} />
          <Route path="/retro" element={<RetroPage />} />
          <Route path="/retros/past" element={<PastRetroPage />} />
          <Route path="/retromanagement" element={<RetroManagementPage />} />
          <Route path="/retros/:retroID" element={<RetroPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
