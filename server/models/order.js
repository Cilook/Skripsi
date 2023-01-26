const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Order Schema
const OrderSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  phoneNumber: {
    type: Number
  },
  firstName: {
    type: String
  },
  imageUrl: {
    type: String
  },
  imageKey: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  weddingdate: {
    type: String
  },
  address: {
    type: String
  },
  total: {
    type: Number,
    default: 0
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Order', OrderSchema);
