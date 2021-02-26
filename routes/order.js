const router = require('express').Router()
const { OrderController } = require('../controllers')
const Authentication = require('../middlewares/authentication')

router.use(Authentication.userAuthentication)
router.post('/:dishId', OrderController.addUpdateOrder)
router.get('/', OrderController.showOrder)
router.delete('/:id', OrderController.removeOrder)


module.exports = router