import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import { LandingPage } from './containers/LandingPage/LandingPage.Container';
// import IndexPage from './containers/IndexPage/IndexPage';
import RetroPage from './containers/RetroPage/RetroPage';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          {/* <Route path="/" element={<IndexPage />} /> */}
          <Route path='/' element={<RetroPage />} />  
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
