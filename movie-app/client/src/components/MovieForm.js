import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import movieService from '../services/movieService';

function MovieForm() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [image, setImage] = useState('');
    const [time, setTime] = useState('');
    const [genre, setGenre] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await movieService.createMovie({
                name,
                year,
                introduce,
                image,
                genre
            });
            navigate('/');
        } catch (err) {
            console.error('Lỗi thêm phim:', err);
        }
    };

    return (
        <div className="movie-form">
            <h2>Thêm Phim</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Tên phim:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="year">Năm:</label>
                    <input
                        type="number"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="introduce">Mô tả:</label>
                    <textarea
                        id="introduce"
                        value={introduce}
                        onChange={(e) => setIntroduce(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Hình ảnh:</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="Time">Thời lượng:</label>
                    <input
                        type="number"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="genre">Thể loại:</label>
                    <select
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    >
                        <option value="">Chọn thể loại</option>
                        <option value="Action">Hành động</option>
                        <option value="Comedy">Hài</option>
                        <option value="Drama">Tâm lý</option>
                        <option value="Horror">Kinh dị</option>
                        <option value="Romance">Lãng mạn</option>
                        <option value="Science Fiction">Khoa học viễn tưởng</option>
                        <option value="Thriller">Giật gân</option>
                    </select>
                </div>
                <button type="submit">Thêm phim</button>
            </form>
        </div>
    );
}

export default MovieForm;