import Zone from "../model/zone.js"

const findOne = async (id, res, kafe_id) => {
    const all = await Zone.find()
    const find = all.find(e => e._id == id)
    if (!find || find.kafe_id != kafe_id) {
        res.status(404).json({
            status: 404,
            message: "Zone Not Found"
        })
        return ''
    }
    return find
}

export const zoneCreate = async (req, res) => {
    try {
        const { title, kafe_id } = req.result

        await Zone.create({
            title,
            kafe_id,
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

export const zoneAll = async (req, res) => {
    try {
        const all = await Zone.find()

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

export const zoneUpdate = async (req, res) => {
    try {
        const body = req.result
        const one = await findOne(req.params.id, res, req.params.kafe_id)
        if (one) {
            await Zone.updateOne({ _id: one._id }, {
                $set: {
                    kafe_id: body.kafe_id || one.kafe_id,
                    title: body.title || one.title,
                }
            })
            res.status(200).json({
                status: 200,
                message: "Zone updated successfully"
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

export const zoneDelete = async (req, res) => {
    try {
        const one = await findOne(req.params.id, res, req.params.kafe_id)
        if (one) {
            await Zone.deleteOne({ _id: req.params.id })
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
