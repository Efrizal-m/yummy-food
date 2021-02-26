const { Dish } = require('../models')

class DishController {
    static async create (req, res, next) {
        const { name, description, price, VendorId } = req.body
        const payload = { name, description, price, VendorId }
        try {
            const dish = await Dish.create(payload);
            res.status(201).json(dish);   
        }
        catch (error) {
            next(error)
        }
    }

    static async update (req, res, next) {
        const id = +req.params.dishId
        const { name, description, price, VendorId } = req.body
        const payload = { name, description, price, VendorId }
        try {
            const dish = await Dish.update(payload, { where: { id }, returning: true });
            res.status(200).json(dish[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async delete (req, res, next) {
        const id = +req.params.dishId
        try {
            await Dish.destroy({ where: { id } });
            res.status(200).json({message: 'Dish succes to delete'})
        } catch (error) {
            next(error)            
        }
    }

    static async getAll (req, res, next) {
        try {
            const dishes = await Dish.findAll({ order: [['id', 'ASC']] })
            res.status(200).json({dishses})
        } catch (error) {
            next(error)
        }
    }

    static async getOne (req, res, next) {
        const id = +req.params.DishId
        try {
            const dish = await Dish.findByPk(id)
            res.status(200).json({dish})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = DishController