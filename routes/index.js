const router = require('express').Router()
const userRouter = require('./user')
const vendorRouter = require('./vendor')
// const dishRouter = require('./dishes')

router.use('/', userRouter)
router.use('/vendors', vendorRouter)
// router.use('/dishes', dishRouter)

module.exports = router