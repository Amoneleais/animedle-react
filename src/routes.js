import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  
import ClassicMode from './pages/ClassicMode';

export default function WebRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ClassicMode />} />
            </Routes>
        </BrowserRouter>
    );
}