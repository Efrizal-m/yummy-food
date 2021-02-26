const router = require('express').Router()
const { DishController } = require('../controllers')
const Authentication = require('../middlewares/authentication')

router.use(Authentication.userAuthentication)
router.get('/', DishController.getAll)
router.post('/', DishController.create)

router.get('/:dishId', DishController.getOne)
router.put('/:dishId', DishController.update)
router.delete('/:dishId', DishController.delete)

module.exports = router