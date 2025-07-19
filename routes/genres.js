import express from 'express';
import { genresController } from '../controllers/genres.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';
const router = express.Router();

router.get('/', verifyToken, genresController.getAllGenres);
router.get('/:genre/books', verifyToken, genresController.getBooksByGenre);

router.use(verifyToken, verifyAdmin);
router.post('/many', genresController.createGenres);

export default router;
