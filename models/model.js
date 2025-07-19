import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
        national: { type: String },
        description: { type: String, maxlength: 180 },
    },
    { collection: 'authors' }
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

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false }, // 👈 ẩn field này khi gọi find
        age: { type: Number },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { collection: 'users' }
);

const genresSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
    },
    { collection: 'genres' }
);

let Book = mongoose.model('Book', bookSchema);
let Author = mongoose.model('Author', authorSchema);
let User = mongoose.model('User', userSchema);
let Genres = mongoose.model('Genres', genresSchema);

export { Book, Author, User, Genres };
