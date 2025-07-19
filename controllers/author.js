import { Author, Book } from '../models/model.js';

const authController = {
    // Tạo nhiều authors
    addManyAuthors: async (req, res) => {
        try {
            // req.body là mảng các authors
            const authorsList = await Author.insertMany(req.body);
            res.status(201).json(authorsList);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    addAuthor: async (req, res) => {
        try {
            const author = new Author(req.body);
            const authorSaved = await author.save();
            res.status(200).json(authorSaved);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAnAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id).populate('books');
            res.status(200).json(author);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllAuthors: async (req, res) => {
        try {
            const author = await Author.find();
            res.status(200).json(author);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);
            await author.updateOne({ $set: req.body });
            res.status(200).json('Updated Successfully!');
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            await Book.updateMany({ author: req.params.id }, { author: null });
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted Succesfully');
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

export default authController;
