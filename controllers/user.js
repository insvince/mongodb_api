import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/model.js';

const userController = {
    getToken: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Tìm user theo email
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // So sánh mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }

            // Tạo JWT token
            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    role: user.role,
                },
                // process.env.JWT_SECRET,
                'imvince',
                { expiresIn: '1d' }
            );

            // Trả về token và user (ẩn password)
            const userObj = user.toObject();
            delete userObj.password;

            res.status(200).json({
                message: 'Login successful',
                token,
                user: userObj,
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    // Tạo mới user với password được hash
    createUser: async (req, res) => {
        try {
            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            // Tạo user mới với password đã hash
            const newUser = new User({
                ...req.body,
                password: hashedPassword,
            });

            const savedUser = await newUser.save();
            const userObj = savedUser.toObject();
            delete userObj.password;

            res.status(201).json(userObj);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    // Tạo mới user với password được hash
    createManyUsers: async (req, res) => {
        try {
            const saltRounds = 10;

            // Hash từng mật khẩu trong mảng users
            const usersWithHashedPasswords = await Promise.all(
                req.body.map(async (user) => {
                    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                    return {
                        ...user,
                        password: hashedPassword,
                    };
                })
            );

            // Lưu vào database
            const insertedUsers = await User.insertMany(usersWithHashedPasswords);

            // Ẩn mật khẩu trước khi trả về client
            const sanitizedUsers = insertedUsers.map((user) => {
                const userObj = user.toObject();
                delete userObj.password;
                return userObj;
            });

            res.status(201).json(sanitizedUsers);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Lấy tất cả user
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select('-__v');
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Lấy user theo id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-__v');
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
