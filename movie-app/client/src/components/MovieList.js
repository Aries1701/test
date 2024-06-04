import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import movieService from '../services/movieService';

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await movieService.getMovies();
                setMovies(response.data);
            } catch (err) {
                console.error('Lỗi tải danh sách phim:', err);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="movie-list">
            <h2>Danh sách Phim</h2>
            <ul>
                {movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </ul>
        </div>
    );
}

export default MovieList;