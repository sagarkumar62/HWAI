import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HWAILanding from '../pages/HWAILanding';
import Models from '../pages/Models';
import Datasets from '../pages/Datasets';
import Papers from '../pages/Papers';
import Discussions from '../pages/Discussions';
import Projects from '../pages/Projects';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HWAILanding />} />
            <Route path="/models" element={<Models />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/papers" element={<Papers />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter