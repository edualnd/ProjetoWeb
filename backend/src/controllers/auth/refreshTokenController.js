
import { decodeAccessToken } from "../../utils/security/token.js";

const refreshTokenController = (req, res)=>{
    //Checa o acess
    const accessToken = req.body.accessToken;
    const isValid = decodeAccessToken(accessToken);
    
    //checa o refresh
    //Checa o banco
    //valida o access
    //Valida o refresh
    return res.status(200).json({
        message: 'Refresh token controller is working',
        accessToken: accessToken,
        isValid: isValid
    });
}

export default refreshTokenController;