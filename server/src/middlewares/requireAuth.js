import jwt  from "jsonwebtoken";

export const requireAuth = (req, res, next) => {

    const authHader = req.headers.authorization

    if( !authHader) return res.status(401).json({
        message: "No estas autorizado"
    })

    const token = authHader.split(' ')[1]

    if(!token) return res.status(401).json({
        message: "No estas autorizado"
    })

    jwt.verify(token, 'secret', (error, user)=>{
        if(error) return res.status(401).json({
            message: "No estas autorizado"
        })
        req.user=user
    next()
    })

}