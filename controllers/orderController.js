const { Order } = require('../models')

class OrderController {
    static async addUpdateOrder (req, res, next) {
        try {
            const dish = await Dish.findByPk(req.params.dishId)
            const payload = {
                DishId: dish.id,
                UserId: req.loggedInUser.id,
                quantity: 1,
                status: 'unpaid'
            }
            if (!dish) {
                throw { status: 400, message: 'invalid dish id' }
            }
            else {            
                const order = await Order.findOne({
                    where: {
                        UserId: req.loggedInUser.id,
                        DishId: payload.DishId,
                        status: 'unpaid'
                    }
                })
                if (!order) {
                    const newOrder = await Order.create(payload)
                    res.status(201).json(newOrder)                                        
                }
                else if (payload.quantity === 0) {
                    await Order.destroy({
                        where: { id: order.id }
                    })
                    res.status(200).json({message: 'order succes to delete'})      
                }
                else if (payload.DishId === order.DishId) {
                    payload.quantity = req.body.quantity
                    const updatedOrder = await Order.update(payload, { where: { id: order.id }, returning: true })
                    res.status(200).json(updatedOrder[1][0])                                        
                }
            }
        } catch (error) {
            next(error)
        }            
    }

    static async showOrder (req, res, next) {
        try {
            const orders
                = await Order.findAll({
                    order: [['id', 'ASC']],
                    where: {
                        UserId: req.loggedInUser.id,
                        status: 'unpaid'
                    },
                    include : [{
                        model: Dish
                    }]  
                })
            res.status(200).json({orders, total})            
        } catch (error) {
            next(error)
        }
    }

    static async removeOrder (req, res, next) {
        try {
            await Order.destroy({
                where: { id: req.params.id }
            })
            res.status(200).json({message: 'Order succes to delete'})
        } catch (error) {
            next(error)
        }
    }




}

module.exports = OrderController