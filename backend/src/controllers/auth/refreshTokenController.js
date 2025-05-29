
import { deleteSession, findSession } from "../../utils/security/session.js";
import { decodeAccessToken, validateRefreshToken } from "../../utils/security/token.js";

const refreshTokenController = async (req, res)=>{
    
    const accessToken = req.body.accessToken;
    const {deviceId, exp, iat, sub} = decodeAccessToken(accessToken);
    const data = Math.floor(Date.now() / 1000);
    
    
    //Se o token expirou a mais de uma hora, invalida ele
    const isValid = data>=exp && data<= exp+3600000 ;
    if(deviceId != req.cookies?.deviceId || !isValid){
        await deleteSession(req.cookies?.deviceId)
        return res.status(401).json({
            message: 'Faça login',
            
        });
    }

    //checa o refresh
    const refreshToken = validateRefreshToken(req.cookies?.refreshToken)
    if(refreshToken.data.userId != sub){
        await deleteSession(req.cookies?.deviceId)
        return res.status(401).json({
            message: 'Faça login',
            error: "UserId verification"
            
        });
    }
    console.log(refreshToken)
    //Checa o banco
    const session = await findSession(refreshToken.data.deviceId, refreshToken.data.sub)
    console.log(session)
    //valida o access
    //Valida o refresh
    return res.status(200).json({
        message: 'Refresh token controller is working',
        exp,
        iat,
        sub
    });
}

export default refreshTokenController;