'use strict'

const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  pastOrder: {
    type: Array,
    required: true
  },
  orderTotal: {
    type: Number,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
