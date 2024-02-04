import Auth from "../model/auth.js"
import { verifyPassword } from "../utils/bcrypt.js"
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const { username, password } = req.result
        const all = await Auth.find()
        const find = all.find(e => e.auth_login == username)
        if (find) {
            if (await verifyPassword(password, find?.auth_password)) {
                const token = jwt.sign({ id: find._id, status: find.status }, process.env.SECRET_KEY)
                res.status(200).json({
                    status: 200,
                    token
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Users Not Found"
                })
            }
        } else {
            return res.status(404).json({
                status: 404,
                message: "Users Not Found"
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
