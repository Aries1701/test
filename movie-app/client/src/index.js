const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Movie = require('./models/Movie');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../config/cloudinary.config');

// API đăng ký
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API đăng nhập
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Tên người dùng không tồn tại!' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác!' });
        }
        const token = jwt.sign({ userId: user._id }, 'WvGwJYVf7K', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware xác thực
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: 'Yêu cầu xác thực!' });

    jwt.verify(token, 'WvGwJYVf7K', (err, user) => {
        if (err) return res.status(403).json({ message: 'Token không hợp lệ!' });
        req.user = user;
        next();
    });
};


// Cập nhật thêm phim
app.post('/movies', upload.single('image'), async (req, res) => {
    try {
        const { title, year, description, duration, genre } = req.body;
        const image = req.file.path; 
        const movie = new Movie({ title, year, description, image, duration, genre });
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/movies', authenticateToken, async (req, res) => {

});
