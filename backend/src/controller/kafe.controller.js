import Auth from "../model/auth.js"
import Kafe from "../model/kafe.js"
import remove_img from '../utils/remove_img.js'
import { createHash } from "../utils/bcrypt.js"

const findOne = async (id, res, filename = '') => {
    const all = await Kafe.find()
    const find = all.find(e => e._id == id)
    if (!find) {
        filename && remove_img(one.logo)
        res.status(404).json({
            status: 404,
            message: "Kafe Not Found"
        })
        return ''
    }
    return find
}

export const kafeCreate = async (req, res) => {
    try {
        const { kafe_nomi, telefon_raqam, direktor, location, admin_login, admin_password } = req.result
        if (!req.filename) {
            return res.status(400).json({
                status: 400,
                message: "Logo is required"
            })
        }

        const admin_id = await Auth.create({
            auth_login: admin_login,
            auth_password: await createHash(admin_password),
            status: "kafeAdmin"
        })
        await Kafe.create({
            kafe_nomi,
            telefon_raqam,
            direktor,
            logo: req.filename,
            location,
            admin_id: admin_id._id
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

export const kafeAll = async (req, res) => {
    try {
        const all = await Kafe.find()
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || all.length;
        const search = req.query.search || '';

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        res.status(200).json({
            status: 200,
            data: all.filter(e => e.kafe_nomi.toLowerCase().includes(search.toLowerCase())).slice(startIndex, endIndex),
            length: all.length,
            page,
            pageSize,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const kafeOne = async (req, res) => {
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

export const kafeUpdate = async (req, res) => {
    try {
        const body = req.result
        const { filename } = req
        const one = await findOne(req.params.id, res, filename)
        if (one) {
            filename && remove_img(one.logo)
            if (body.admin_login || body.admin_password) {
                const auth = await Auth.findById(one.admin_id)
                await Auth.updateOne({ _id: one.admin_id }, {
                    $set: {
                        auth_login: body.admin_login || auth.auth_login,
                        auth_password: createHash(body.admin_password) || auth.auth_password
                    }
                })
            }
            await Kafe.updateOne({ _id: one._id }, {
                $set: {
                    kafe_nomi: body.kafe_nomi || one.kafe_nomi,
                    telefon_raqam: body.telefon_raqam || one.telefon_raqam,
                    direktor: body.direktor || one.direktor,
                    logo: filename || one.logo,
                    location: body.location || one.location,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Kafe updated successfully"
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

export const kafeDelete = async (req, res) => {
    try {
        const one = await findOne(req.params.id, res)
        if (one) {
            remove_img(one.logo)
            await Auth.deleteOne({ _id: one.admin_id })
            await Kafe.deleteOne({ _id: req.params.id })
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
