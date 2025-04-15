const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  tenDangNhap: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  matKhau: {
    type: String,
    required: true
  },
  soDienThoai: {
    type: String,
    required: true
  },
  vaiTro: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash mật khẩu trước khi lưu
userSchema.pre('save', async function(next) {
  if (!this.isModified('matKhau')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.matKhau = await bcrypt.hash(this.matKhau, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Phương thức đăng ký
userSchema.methods.dangKy = async function() {
  return this.save();
};

// Phương thức đăng nhập
userSchema.methods.dangNhap = async function(matKhau) {
  try {
    const isMatch = await bcrypt.compare(matKhau, this.matKhau); // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa
    return isMatch;
  } catch (error) {
    throw new Error('Lỗi khi so sánh mật khẩu');
  }
};

// Phương thức đăng xuất
userSchema.methods.dangXuat = async function() {
  // Implement logic đăng xuất nếu cần
  return true;
};

// Phương thức cập nhật thông tin
userSchema.methods.capNhatThongTin = async function(tenDangNhap, email, soDienThoai, matKhau) {
  if (tenDangNhap) this.tenDangNhap = tenDangNhap;
  if (email) this.email = email;
  if (soDienThoai) this.soDienThoai = soDienThoai;
  if (matKhau) {
    const salt = await bcrypt.genSalt(10);
    this.matKhau = await bcrypt.hash(matKhau, salt);
  }
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;