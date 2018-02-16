'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Cart = models.cart

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
const stripe = require('stripe')('sk_test_hNfSbTYlJXKPgq07KvOUGBvC')

let amount
const index = (req, res, next) => {
  Cart.find({_owner: req.user.id})
    .then(carts => res.json({
      carts: carts.map((e) =>
      e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    cart: req.cart.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  amount = req.body.cart.orderTotal
  const cart = Object.assign(req.body.cart, {
    _owner: req.user._id
  })
  Cart.create(cart)
    .then(cart =>
      res.status(201)
        .json({
          cart: cart.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  amount = req.body.cart.orderTotal

  delete req.body.cart._owner

  req.cart.update(req.body.cart)
    .then((cart) => res.sendStatus(204)
    .json({
      cart: req.cart.toJSON({ virtuals: true, user: req.user })
    }))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.cart.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

const charge = (req, res, next) => {
  stripe.customers.create({
    email: req.body.email,
    source: req.body.id
  })
  .then(customer => {
    return stripe.charges.create({
      amount,
      description: 'Store Payment',
      currency: 'usd',
      customer: customer.id
    })
  })
  .then(charge => {
    // console.log('this is a charge: ', charge)

  })
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  charge
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, only: ['index', 'show', 'create', 'update', 'destroy'] },
  { method: setModel(Cart), only: ['show'] },
  { method: setModel(Cart, { forUser: true }), only: ['update', 'destroy'] }
] })
