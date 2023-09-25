import express from 'express';
import authController from '../controllers/author.js';

const router = express.Router();

/* ADD AUTHOR */
router.post('/', authController.addAuthor);
/* GET ALL AUTHOR */
router.get('/', authController.getAllAuthors);
/* GET AN AUTHOR */
router.get('/:id', authController.getAnAuthor);
/* UPDATE AUTHOR */
router.put('/:id', authController.updateAuthor);
/* DELETE AUTHOR */
router.delete('/:id', authController.deleteAuthor);

export default router;
