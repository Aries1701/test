const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Movie = require('./models/Movie');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB
mongoose.connect('mongodb://localhost:27017/fullstack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connect successfully!'))
.catch(err => console.error('MongoDB err to connect!', err));

// Danh sách phim
app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Thêm phim
app.post('/movies', async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Cập nhật phim
app.put('/movies/:id', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Xóa phim
app.delete('/movies/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Phim đã bị xóa.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API tìm kiếm phim theo tên
app.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const movies = await Movie.find({ name: { $regex: searchTerm, $options: 'i' } });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API danh sách phim được sắp xếp theo năm
app.get('/movies/by-year', async (req, res) => {
    try {
        const movies = await Movie.find().sort({ year: -1 });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Khởi động server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running... ${port}`));