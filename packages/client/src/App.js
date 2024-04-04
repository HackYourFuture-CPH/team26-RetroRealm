import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './containers/NavbarPage/Navbar';
import RetroPage2 from './containers/RetroPageSecond/RetroPage2';
import IndexPage from './containers/IndexPage/IndexPage';
// import { LandingPage } from './containers/LandingPage/LandingPage.Container';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';
import CreateTeam from './containers/CreateTeamPage/CreateTeam';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<RetroPage2 />} />
          <Route path="/" element={<IndexPage />} />
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/CreateNewTeamPage" element={<CreateTeam />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
