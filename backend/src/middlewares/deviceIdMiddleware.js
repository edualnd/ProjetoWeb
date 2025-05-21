const deviceIdGenerator = async (req, res, next) => {
    const isDeviceId = req.cookies?.deviceId;
    if(!isDeviceId){
        const deviceId = crypto.randomUUID();
        res.cookies('deviceId', deviceId, {
            httpOnly: true,
            path:"/",
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30 
        })
    }
    next()
};

export default deviceIdGenerator;