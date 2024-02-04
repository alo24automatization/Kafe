import Stol from "../model/stol.js"
import remove_img from '../utils/remove_img.js'
import qr from 'qrcode';
import path from 'path';
import jwt from "jsonwebtoken";
import Ofisiant from "../model/ofisiant.js";

const findOne = async (id, res, kafe_id) => {
    const all = await Stol.find()
    const find = all.find(e => e._id == id)
    if (!find && find.kafe_id != kafe_id) {
        res.status(404).json({
            status: 404,
            message: "Stol Not Found"
        })
        return ''
    }
    return find
}

export const stolCreate = async (req, res) => {
    try {
        const { stol_nomi, kafe_id, zone_id, ofisiant_id } = req.result

        const newStol = await Stol.create({
            stol_nomi,
            kafe_id,
            QR: "new",
            zone_id,
            ofisiant_id: ofisiant_id ? ofisiant_id : null,
        })
        const folder = path.join(process.cwd(), 'uploads', newStol._id + '.png')
        const data = process.env.URL + newStol._id

        await qr.toFile(folder, data)
        await Stol.updateOne({ _id: newStol._id }, { $set: { QR: newStol._id + '.png' } })
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

export const stolAll = async (req, res) => {
    try {
        const all = await Stol.find()
        const { kafe_id } = req.params
        const filter = all.filter(e => e.kafe_id == kafe_id && !e.ofisiant_id && !e.xizmat_id)

        res.status(200).json({
            status: 200,
            data: filter,
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const stolOfisiant = async (req, res) => {
    try {
        const all = await Stol.find()
        const { kafe_id, ofisiant_id } = req.params
        const filter = all.filter(e => e.kafe_id == kafe_id && e.ofisiant_id == ofisiant_id)

        res.status(200).json({
            status: 200,
            data: filter
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const stolZone = async (req, res) => {
    try {
        const all = await Stol.find()
        const { kafe_id, zone_id } = req.params
        const filter = all.filter(e => e.kafe_id == kafe_id && e.zone_id == zone_id && !e.ofisiant_id && !e.xizmat_id)

        res.status(200).json({
            status: 200,
            data: filter
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const stolActive = async (req, res) => {
    try {
        const all = await Stol.find()
        const { kafe_id, ofisiant_id } = req.params
        const filter = all.filter(e => e.kafe_id == kafe_id && !e.active && e.xizmat_id == ofisiant_id)

        res.status(200).json({
            status: 200,
            data: filter
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}

export const stolUpdate = async (req, res) => {
    try {
        const body = req.result
        const { kafe_id } = req.params
        const one = await findOne(req.params.id, res, kafe_id)
        if (one) {
            await Stol.updateOne({ _id: one._id }, {
                $set: {
                    stol_nomi: body.stol_nomi || one.stol_nomi,
                    kafe_id: body.kafe_id || one.kafe_id,
                    zone_id: body.zone_id || one.zone_id,
                    ofisiant_id: body.ofisiant_id || one.ofisiant_id,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Stol updated successfully"
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "Stol Not Found"
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

export const stolActivateCode = async (req, res) => {
    try {
        const { kafe_id } = req.params
        const { code } = req.result
        const one = await findOne(req.params.id, res, kafe_id)
        if (one) {
            if (one.code == code || !one.code) {
                await Stol.updateOne({ _id: one._id }, {
                    $set: {
                        code
                    }
                })
                const token = jwt.sign({ code, status: 'stol', stol_id: one._id }, process.env.SECRET_KEY)
                res.status(200).json({
                    status: 200,
                    token,
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Stol Code Error"
                })
            }
        } else {
            res.status(404).json({
                status: 404,
                message: "Stol Not Found"
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

export const stolActivate = async (req, res) => {
    try {
        const { ofisiant_id } = req
        const { kafe_id } = req.params
        const ofisiant = await Ofisiant.findOne({ admin_id: ofisiant_id })
        const one = await findOne(req.params.id, res, kafe_id)
        if (one && one.code) {
            await Stol.updateOne({ _id: one._id }, {
                $set: {
                    active: true,
                    xizmat_id: ofisiant._id,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Stol updated successfully"
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "Stol uchun user kod kiritmagan"
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

export const stolNoActivate = async (req, res) => {
    try {
        const { ofisiant_id } = req
        const { kafe_id } = req.params
        const one = await findOne(req.params.id, res, kafe_id)
        if (one && one.xizmat_id == ofisiant_id) {
            await Stol.updateOne({ _id: one._id }, {
                $set: {
                    active: false,
                    xizmat_id: null,
                    code: null,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Stol updated successfully"
            })
        } else {
            res.status(404).json({
                status: 404,
                message: "Stol not found"
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

export const stolDelete = async (req, res) => {
    try {
        const { kafe_id } = req.params
        const one = await findOne(req.params.id, res, kafe_id)
        if (one) {
            remove_img(one.image)
            await Stol.deleteOne({ _id: req.params.id })
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
