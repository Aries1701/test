import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import movieService from '../services/movieService';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await movieService.getMovie(id);
                setMovie(response.data);
            } catch (err) {
                console.error('Lỗi tải thông tin phim:', err);
            }
        };
        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-details">
            <img src={movie.image}/>
            <h2>{movie.name}</h2>
            <p>{movie.year}</p>
            <p>{movie.introduce}</p>
            <p>Thời lượng: {movie.time} phút</p>
        </div>
    );
}

export default MovieDetails;