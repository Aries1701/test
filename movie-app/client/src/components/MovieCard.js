import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    return (
        <li className="movie-card">
            <Link to={`/movies/${movie._id}`}>
                <img src={movie.image} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
            </Link>
        </li>
    );
}

export default MovieCard;