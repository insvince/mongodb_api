import express from 'express';
import { genresController } from '../controllers/genres.js';

const router = express.Router();

/* TẠO NHIỀU GENRES */
router.post('/many', genresController.createGenres);

/* LẤY TẤT CẢ GENRES (duy nhất từ books) */
router.get('/', genresController.getAllGenres);

/* LẤY TẤT CẢ SÁCH THEO GENRE */
router.get('/:genre/books', genresController.getBooksByGenre);

export default router;
