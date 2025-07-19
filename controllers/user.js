import { User } from '../models/model.js';

const userController = {
    // Tạo mới user
    createUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    createManyUsers: async (req, res) => {
        try {
            // req.body là mảng các users
            const usersList = await User.insertMany(req.body);
            res.status(201).json(usersList);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Lấy tất cả user
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Lấy user theo id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(404).json({ error: 'User not found' });
        }
    },

    // Cập nhật user
    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Xóa user
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};

export { userController };
