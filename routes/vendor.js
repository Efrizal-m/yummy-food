const router = require('express').Router()
const { VendorController } = require('../controllers')
const Authentication = require('../middlewares/authentication')

router.use(Authentication.userAuthentication)
router.get('/', VendorController.getAll)
router.post('/', VendorController.create)

router.get('/:vendorId', VendorController.getOne)
router.put('/:vendorId', VendorController.update)
router.delete('/:vendorId', VendorController.delete)

module.exports = router