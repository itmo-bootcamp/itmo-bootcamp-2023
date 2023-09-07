import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import { SkillsPage } from './SkillsPage';
import { VacancyLinkPage } from './VacancyLinkPage';

const routerBaseName = process.env.NODE_ENV === 'development' ? '/' : 'itmo-bootcamp23';

const RouterPage = () => {
  return (
    <BrowserRouter basename={routerBaseName}>
      <Routes>
        <Route path="/" Component={VacancyLinkPage} />
        <Route path="/skills" Component={SkillsPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPage;
