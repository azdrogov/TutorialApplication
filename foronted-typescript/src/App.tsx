import React from 'react';
import './App.css';
import {Tutorials} from './features/tutorials/Tutorials';
import {TutorialCard} from './features/tutorials/TutorialCard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Tutorials />} />
                <Route path={'/:id'} element={<TutorialCard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
