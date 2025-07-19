import express from 'express';
import bookController from '../controllers/book.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', verifyToken, bookController.getAllBooks);
router.get('/:id', verifyToken, bookController.getBook);

router.use(verifyToken, verifyAdmin);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;
