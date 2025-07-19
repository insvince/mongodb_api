import jwt from 'jsonwebtoken';
import { User } from '../models/model.js';
import bcrypt from 'bcryptjs';

const loginController = {
    // Lấy token cho người dùng
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
                process.env.JWT_SECRET,
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
};
export { loginController };
