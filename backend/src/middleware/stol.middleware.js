import jwt from 'jsonwebtoken'
import Stol from '../model/stol.js';

export default (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ status: 401, error: 'Unauthorized' });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, value) => {
        if (err) {
            return res.status(403).json({ status: 403, error: 'Forbidden' });
        }
        if (value.status === 'stol') {
            const stol_code = await Stol.findOne({ code: value.code })
            if (stol_code) {
                req.stol_id = value.stol_id
                next();
            } else {
                return res.status(403).json({ status: 403, error: 'Forbidden' });
            }
        } else {
            return res.status(403).json({ status: 403, error: 'Forbidden' });
        }
    });
};
