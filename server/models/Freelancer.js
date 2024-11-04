const mongoose = require('mongoose');

const { Schema } = mongoose;

const freelancerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  availability: {
    type: Boolean,
    default: true
  },
  skills: []
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;
