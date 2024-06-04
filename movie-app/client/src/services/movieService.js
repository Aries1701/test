import axios from 'axios';

const apiUrl = 'http://localhost:27017/fullstack';
const movieService = {
    getMovies: () => axios.get(apiUrl),
    getMovie: (id) => axios.get(`${apiUrl}/${id}`),
    createMovie: (movie) => axios.post(apiUrl, movie),
    updateMovie: (id, movie) => axios.put(`${apiUrl}/${id}`, movie),
    deleteMovie: (id) => axios.delete(`${apiUrl}/${id}`)
};

export default movieService;