import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './containers/NavbarPage/Navbar';
import JoinRetroPage from './containers/JoinRetroPage/JoinRetroPage';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';
import CreateTeam from './containers/CreateTeamPage/CreateTeam';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/JoinRetroPage" element={<JoinRetroPage />} />
          <Route path="/CreateNewTeamPage" element={<CreateTeam />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
