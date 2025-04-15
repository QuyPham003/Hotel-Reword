const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  tenPhong: {
    type: String,
    required: true
  },
  loaiPhong: {
    type: String,
    required: true,
    enum: ['standard', 'deluxe', 'suite', 'luxury']
  },
  giaPhong: {
    type: Number,
    required: true
  },
  giaGoc: {
    type: Number,
    required: true
  },
  dienTich: {
    type: Number,
    required: true
  },
  soGiuong: {
    type: String,
    required: true
  },
  sucChua: {
    nguoiLon: {
      type: Number,
      required: true,
      default: 2
    },
    treEm: {
      type: Number,
      default: 2
    },
    emBe: {
      type: Number, 
      default: 1
    }
  },
  khuyenMai: {
    type: String
  },
  tienNghi: [{
    type: String
  }],
  hinhAnh: [{
    type: String
  }],
  trangThai: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  },
  moTa: String
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
