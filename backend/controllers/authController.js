const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.dangKy = async (req, res) => {
  try {
    const { tenDangNhap, email, matKhau, soDienThoai } = req.body;

    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    const existingUser = await User.findOne({ tenDangNhap });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const user = new User({
      tenDangNhap,
      email,
      matKhau,
      soDienThoai,
      vaiTro: 'user' // Mặc định là user
    });

    await user.dangKy();

    const token = jwt.sign(
      { userId: user._id, vaiTro: user.vaiTro },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      user: {
        id: user._id,
        tenDangNhap: user.tenDangNhap,
        email: user.email,
        vaiTro: user.vaiTro
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.dangNhap = async (req, res) => {
  try {
    const { tenDangNhap, matKhau } = req.body;
    console.log('Đăng nhập với:', tenDangNhap); // Log tên đăng nhập
    
    const user = await User.findOne({ tenDangNhap });
    if (!user) {
      console.log('Không tìm thấy người dùng');
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    const isMatch = await user.dangNhap(matKhau); // Gọi phương thức dangNhap để kiểm tra mật khẩu
    if (!isMatch) {
      console.log('Mật khẩu không đúng');
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    const token = jwt.sign(
      { userId: user._id, vaiTro: user.vaiTro },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Đăng nhập thành công:', user.tenDangNhap);
    res.json({
      token,
      user: {
        id: user._id,
        tenDangNhap: user.tenDangNhap,
        email: user.email,
        vaiTro: user.vaiTro
      }
    });
  } catch (error) {
    console.error('Lỗi server:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.kiemTraVaiTro = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      vaiTro: user.vaiTro,
      tenDangNhap: user.tenDangNhap
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};