'use strict'

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productQuantity: {
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

// exampleSchema.virtual('length').get(function length () {
//   return this.text.length
// })

const Product = mongoose.model('Example', productSchema)

module.exports = Product
