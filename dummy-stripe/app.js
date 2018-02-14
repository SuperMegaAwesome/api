const keyPublishable = process.env.PUBLISHABLE_STRIPE_KEY


const express = require('express')
const app = express()
const stripe = require('stripe')(keySecret)

app.use(require('body-parser').urlencoded({extended: false}))



app.listen(4567)
