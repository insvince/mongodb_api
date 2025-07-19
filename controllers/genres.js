import { Genres, Book } from '../models/model.js';

const genresController = {
    // Tạo nhiều genres
    createGenres: async (req, res) => {
        try {
            // req.body là mảng các genres
            const genresList = await Genres.insertMany(req.body);
            res.status(201).json(genresList);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Lấy tất cả genres (danh sách thể loại duy nhất từ books)
    getAllGenres: async (req, res) => {
        try {
            const genres = await Book.distinct('genres');
            res.status(200).json(genres);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Lấy tất cả sách theo genre
    getBooksByGenre: async (req, res) => {
        try {
            const books = await Book.find({ genres: req.params.genre });
            res.status(200).json(books);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

export { genresController };
