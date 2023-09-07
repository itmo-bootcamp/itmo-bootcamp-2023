import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import { SkillsPage } from './SkillsPage';
import { VacancyLinkPage } from './VacancyLinkPage';

const RouterPage = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={VacancyLinkPage} />
        <Route path="/skills" Component={SkillsPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPage;
