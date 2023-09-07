import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import { VacancyLinkPage } from './VacancyLinkPage';

const RouterPage = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={VacancyLinkPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPage;
