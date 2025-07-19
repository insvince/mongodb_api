import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
        national: { type: String },
        description: { type: String, maxlength: 180 },
    },
    { collection: 'users' }
);

const bookSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        publishedDate: { type: String, required: true },
        genres: [String],
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    },
    { collection: 'books' }
);

let Book = mongoose.model('Book', bookSchema);
let Author = mongoose.model('Author', authorSchema);

export { Book, Author };
