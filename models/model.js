import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: { type: String, require: true },
    year: { type: Number, require: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    national: { type: String },
    description: { type: String, length: 180 },
});

const bookSchema = new mongoose.Schema({
    name: { type: String, require: true },
    publishedDate: { type: String, require: true },
    genres: [String],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
});

let Book = mongoose.model('Book', bookSchema);
let Author = mongoose.model('Author', authorSchema);

export { Book, Author };
