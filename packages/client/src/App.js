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
import { RetroCodeProvider } from './containers/Contexts/RetroCodeProvider';
import ContactUs from './containers/ContactUsPage/ContactUsPage';
import AboutUs from './containers/AboutUsPage/AboutUsPage';

function App() {
  return (
    <div className="app">
      <RetroCodeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/:teamId/retro" element={<RetroPage />} />
            <Route path="/CreateNewTeamPage" element={<CreateTeam />} />
            <Route path="/joinretro" element={<JoinRetroPage />} />
            <Route path="/retro" element={<RetroPage />} />
            <Route path="/retros/past" element={<PastRetroPage />} />
            <Route path="/retromanagement" element={<RetroManagementPage />} />
            <Route path="/retro/:retroID" element={<RetroPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </Router>
      </RetroCodeProvider>
    </div>
  );
}

export default App;
