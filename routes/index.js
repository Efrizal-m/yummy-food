const router = require('express').Router()
const userRouter = require('./user')
const vendorRouter = require('./vendor')
const dishRouter = require('./dish')
const orderRouter = require('./order')

router.use('/', userRouter)
router.use('/vendors', vendorRouter)
router.use('/dishes', dishRouter)
router.use('/orders', orderRouter)

module.exports = router