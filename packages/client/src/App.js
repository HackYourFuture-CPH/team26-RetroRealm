import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './containers/NavbarPage/Navbar';
import IndexPage from './containers/IndexPage/IndexPage';
// import { LandingPage } from './containers/LandingPage/LandingPage.Container';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';
import CreateTeam from './containers/CreateTeamPage/CreateTeam';
import { PastRetroPage } from './containers/PastRetroPage/PastRetroPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/CreateNewTeamPage" element={<CreateTeam />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/retros/past" element={<PastRetroPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
