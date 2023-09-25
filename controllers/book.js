import { Author, Book } from '../models/model.js';

const bookController = {
    addABook: async (req, res) => {
        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            if (req.body.author) {
                const author = Author.findById(req.body.author);
                await author.updateOne({ $push: { books: savedBook._id } });
            }
            res.status(200).json(savedBook);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getABook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate('author');
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllBooks: async (req, res) => {
        try {
            const allbooks = await Book.find();
            res.status(200).json(allbooks);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({ $set: req.body });
            res.status(200).json('Updated Successfully!');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteBook: async (req, res) => {
        try {
            await Author.updateMany(
                { books: req.params.id },
                { $pull: { books: req.params.id } },
            );
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted Succesfully');
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

export default bookController;
