import { io } from '../app.js'
import Ofisiant from '../model/ofisiant.js'
import Order from '../model/order.js'
import Stol from '../model/stol.js'

const findOne = async (id, res, stol_id) => {
    const all = await Order.find()
    const find = all.find(e => e._id == id)
    if (!find || find.stol_id != stol_id) {
        res.status(404).json({
            status: 404,
            message: "Order Not Found"
        })
        return ''
    }
    return find
}

export const orderCreate = async (req, res) => {
    try {
        const { product_id } = req.result
        const { stol_id } = req
        const stol = await Stol.findOne({ _id: stol_id })

        console.log(stol)
        if (stol.active) {
            io.emit('stol_order', { status: "create", stol_id: stol._id, ofisiant_id: stol.xizmat_id })
            await Order.create({
                product_id,
                stol_id,
                count: 0
            })
            res.status(201).json({
                status: 201,
                message: "Created"
            })
        } else {
            res.status(400).json({
                status: 400,
                message: "Stol noActive"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const orderAll = async (req, res) => {
    try {
        const { stol_id } = req
        const stol = await Stol.findOne({ _id: stol_id })
        if (stol.active) {
            const all = await Order.find()
            res.status(200).json({
                status: 200,
                data: all.filter(e => e.stol_id == stol_id),
            })
        } else {
            res.status(400).json({
                status: 400,
                message: "Stol noActive"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const orderUpdate = async (req, res) => {
    try {
        const { stol_id } = req
        const { action } = req.result;
        const add = action == 'add' ? 1 : -1
        const one = await findOne(req.params.id, res, stol_id)
        const stol = await Stol.findOne({ _id: stol_id })
        if (stol.active) {
            if (one) {
                if (one.count + add != 0) {
                    await Order.updateOne({ _id: one._id }, {
                        $set: {
                            count: one.count + add,
                        }
                    })
                    io.emit('stol_order', { status: "update", stol_id: stol._id, ofisiant_id: stol.xizmat_id })
                    res.status(200).json({
                        status: 200,
                        message: "Product updated successfully"
                    })
                } else {
                    res.status(400).json({
                        status: 400,
                        message: "Product count=0"
                    })
                }
            }
        } else {
            res.status(400).json({
                status: 400,
                message: "Stol noActive"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const orderDelete = async (req, res) => {
    try {
        const { stol_id } = req
        const one = await findOne(req.params.id, res, stol_id)
        const stol = await Stol.findOne({ _id: stol_id })
        if (stol.active) {
            if (one) {
                await Order.deleteOne({ _id: req.params.id })
                io.emit('stol_order', { status: "delete", stol_id: stol._id, ofisiant_id: stol.xizmat_id })
                res.status(204).json({ status: 204 })
            }
        } else {
            res.status(400).json({
                status: 400,
                message: "Stol noActive"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}
