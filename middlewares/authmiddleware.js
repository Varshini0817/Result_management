const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).send({message: 'Access denied. No token provided.', success: false});
    }
    try{
        const decoded = jwt.verify(token, process.env.jwt_token);
        //console.log(`Decoded ${decoded} d.id ${decoded.staffId}`)
        req.body.staffId = decoded.staffId;
        next();
    }
    catch(error){
        return res.status(500).send({
            message: 'Access denied. \nInvalid token',
            success: false
        })
    }
}