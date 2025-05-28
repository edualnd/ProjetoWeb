import { validateAccessToken } from "../utils/security/token.js";

const checkToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(" ")[1];
    const {success, data, error} = validateAccessToken(token)
    if(!success) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: error || 'Invalid token'
        });
    }
    next();
}

export default checkToken;