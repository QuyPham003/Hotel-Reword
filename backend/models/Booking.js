const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ngayDat: {
    type: Date,
    default: Date.now
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  phong: [{
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    soLuong: {
      type: Number,
      required: true,
      min: 1
    },
    thongTinKhach: {
      nguoiLon: {
        type: Number,
        required: true,
        min: 1
      },
      treEm: {
        type: Number,
        default: 0
      },
      emBe: {
        type: Number,
        default: 0
      }
    },
    giaPhong: {
      type: Number,
      required: true
    }
  }],
  tongTien: {
    type: Number,
    required: true
  },
  maGiamGia: {
    type: String
  },
  trangThaiDatPhong: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  trangThaiThanhToan: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  ghiChu: String
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
