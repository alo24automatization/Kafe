import Auth from "../model/auth.js"
import Ofisiant from "../model/ofisiant.js"
import Order from "../model/order.js"
import Stol from "../model/stol.js"
import { createHash } from "../utils/bcrypt.js"

const findOne = async (id, res, kafe_id) => {
    const all = await Ofisiant.find()
    const find = all.find(e => e._id == id)
    if (!find || find.kafe_id != kafe_id) {
        res.status(404).json({
            status: 404,
            message: "Ofitsiant Not Found"
        })
        return ''
    }
    return find
}

export const ofisiantCreate = async (req, res) => {
    try {
        const { username, kafe_id, admin_login, admin_password } = req.result

        const admin_id = await Auth.create({
            auth_login: admin_login,
            auth_password: await createHash(admin_password),
            status: "ofisiant"
        })
        await Ofisiant.create({
            username,
            kafe_id,
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

export const ofisiantAll = async (req, res) => {
    try {
        const all = await Ofisiant.find()

        res.status(200).json({
            status: 200,
            data: all.filter(e => e.kafe_id == req.params.kafe_id),
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const ofisiantToken = async (req, res) => {
    try {
        const { ofisiant_id } = req
        const ofisiant = await Ofisiant.findOne({ admin_id: ofisiant_id })
        console.log(ofisiant)
        if (ofisiant) {
            const allStol = await Stol.find()
            const activeStol = allStol.filter(e => e.active && e.xizmat_id == ofisiant_id)

            const orders = await Order.find()
            for (let i = 0; i < activeStol.length; i++) {
                activeStol[i].orders = orders.filter(e => e.stol_id == activeStol[i].id)
            }

            const attachedStol = allStol.filter(e => e.ofisiant_id == ofisiant_id)

            const noActive = allStol.filter(e => !e.active)

            return res.status(200).json({
                status: 200,
                data: {
                    attachedStol,
                    activeStol,
                    allStol,
                    noActive,
                    ofisiant
                }
            })
        }
        res.status(404).json({
            status: 404,
            message: "Ofisiant Not Found"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const ofisiantOne = async (req, res) => {
    try {
        const find = await findOne(req.params.id, res, req.params.kafe_id)
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

export const ofisiantUpdate = async (req, res) => {
    try {
        const body = req.result
        const one = await findOne(req.params.id, res, req.params.kafe_id)
        if (one) {
            if (body.admin_login || body.admin_password) {
                const auth = await Auth.findById(one.admin_id)
                await Auth.updateOne({ _id: one.admin_id }, {
                    $set: {
                        auth_login: body.admin_login || auth.auth_login,
                        auth_password: createHash(body.admin_password) || auth.auth_password
                    }
                })
            }
            await Ofisiant.updateOne({ _id: one._id }, {
                $set: {
                    kafe_id: body.kafe_id || one.kafe_id,
                    username: body.username || one.username,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Ofitsiant updated successfully"
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

export const ofisiantDelete = async (req, res) => {
    try {
        const one = await findOne(req.params.id, res, req.params.kafe_id)
        if (one) {
            await Auth.deleteOne({ _id: one.admin_id })
            await Ofisiant.deleteOne({ _id: req.params.id })
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
