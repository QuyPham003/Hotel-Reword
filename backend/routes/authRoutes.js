const express = require('express');
const router = express.Router();
const { dangNhap, kiemTraVaiTro, dangKy } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Route đăng nhập
router.post('/login', (req, res, next) => {
  console.log('Route /login được gọi'); // Log kiểm tra
  next();
}, dangNhap);

// Route đăng ký
router.post('/register', dangKy);

// Route kiểm tra vai trò (cần xác thực)
router.get('/check-role', verifyToken, kiemTraVaiTro);

// Route kiểm tra quyền admin (cần xác thực và phải là admin)
router.get('/admin-check', verifyToken, isAdmin, (req, res) => {
  res.json({ message: 'Bạn có quyền truy cập trang admin' });
});

module.exports = router;