const { Vendor } = require('../models')

class VendorController {
    static async create (req, res, next) {
        const { name, address, tags } = req.body
        const UserId = req.loggedInUser.id
        const payload = { name, address, tags }
        try {
            const vendor = await Vendor.create(payload);
            res.status(201).json(vendor);   
        }
        catch (error) {
            next(error)
        }
    }

    static async update (req, res, next) {
        const id = +req.params.vendorId
        const { name, address, tags } = req.body
        const payload = { name, address, tags }
        try {
            const vendor = await Vendor.update(payload, { where: { id }, returning: true });
            res.status(200).json(vendor[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async delete (req, res, next) {
        const id = +req.params.vendorId
        try {
            await Vendor.destroy({ where: { id } });
            res.status(200).json({message: 'Vendor succes to delete'})
        } catch (error) {
            next(error)            
        }
    }

    static async getAll (req, res, next) {
        try {
            const vendors = await Vendor.findAll({ order: [['id', 'ASC']] })
            res.status(200).json({vendors})
        } catch (error) {
            next(error)
        }
    }

    static async getOne (req, res, next) {
        const id = +req.params.vendorId
        try {
            const vendor = await Vendor.findByPk(id)
            res.status(200).json({vendor})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = VendorController