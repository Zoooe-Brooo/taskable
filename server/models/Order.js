const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  freelancers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Freelancer'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
