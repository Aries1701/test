import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movies/add" element={<MovieForm />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;