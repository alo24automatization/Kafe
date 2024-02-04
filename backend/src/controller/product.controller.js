import Product from "../model/product.js"
import remove_img from '../utils/remove_img.js'

const findOne = async (id, res, filename = '') => {
    const all = await Product.find()
    const find = all.find(e => e._id == id)
    if (!find) {
        filename && remove_img(find.image)
        res.status(404).json({
            status: 404,
            message: "Product Not Found"
        })
        return ''
    }
    return find
}

export const productCreate = async (req, res) => {
    try {
        const { title, price, desc, menu_id } = req.result
        if (!req.filename) {
            return res.status(400).json({
                status: 400,
                message: "Image is required"
            })
        }

        await Product.create({
            title,
            image: req.filename,
            price,
            desc,
            menu_id,
        })
        res.status(201).json({
            status: 201,
            message: "Created"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const productAll = async (req, res) => {
    try {
        const all = await Product.find()
        const { menu_id } = req.params

        res.status(200).json({
            status: 200,
            data: all.filter(e => e.menu_id == menu_id),
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const productOne = async (req, res) => {
    try {
        const find = await findOne(req.params.id, res)
        if (find) {
            res.status(200).json({
                status: 200,
                data: find
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

export const productUpdate = async (req, res) => {
    try {
        const body = req.result
        const { filename } = req
        const one = await findOne(req.params.id, res, filename)
        if (one) {
            filename && remove_img(one.image)
            await Product.updateOne({ _id: one._id }, {
                $set: {
                    title: body.title || one.title,
                    price: body.price || one.price,
                    desc: body.desc || one.desc,
                    image: filename || one.image,
                    menu_id: body.menu_id || one.menu_id,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Product updated successfully"
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

export const productDelete = async (req, res) => {
    try {
        const one = await findOne(req.params.id, res)
        if (one) {
            remove_img(one.image)
            await Product.deleteOne({ _id: req.params.id })
            res.status(204).json({ status: 204 })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}
