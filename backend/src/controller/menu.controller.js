import Menu from "../model/menu.js"
import remove_img from "../utils/remove_img.js"

const findOne = async (id, res, filename = '') => {
    const all = await Menu.find()
    const find = all.find(e => e._id == id)
    if (!find) {
        filename && remove_img(find.image)
        res.status(404).json({
            status: 404,
            message: "Menu Not Found"
        })
        return ''
    }
    return find
}

export const menuCreate = async (req, res) => {
    try {
        const { title, kafe_id } = req.result
        const { filename } = req
        if (!filename) {
            return res.status(400).json({
                status: 400,
                message: "Image is required"
            })
        }
        await Menu.create({
            title,
            image: filename,
            kafe_id
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

export const menuAll = async (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            data: await Menu.find()
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const menuOne = async (req, res) => {
    try {
        const one = await findOne(req.params.id, res)
        if (one) {
            res.status(200).json({
                status: 200,
                data: one
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

export const menuUpdate = async (req, res) => {
    try {
        const body = req.result
        const { filename } = req
        const one = await findOne(req.params.id, res, filename)
        if (one) {
            filename && remove_img(one.image)
            await Menu.updateOne({ _id: one._id }, {
                $set: {
                    title: body.title || one.title,
                    image: filename || one.filename,
                    kafe_id: body.kafe_id || one.kafe_id
                }
            })
            res.status(200).json({
                status: 200,
                message: "Menu updated successfully"
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

export const menuDelete = async (req, res) => {
    try {
        const one = await findOne(req.params.id, res)
        if (one) {
            remove_img(one.image)
            await Menu.deleteOne({ _id: req.params.id })
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
