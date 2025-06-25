const jwt = require('jsonwebtoken')

const verifyToken = function (req, res, next) {
       const token = req.cookies.token
       if (!token) {
        return res.status(401).json({msg: 'Unauthorized Access or JWT Token not provided'})
    }
       try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken) {
            return res.status(401).json({msg: 'Unauthorized Access or JWT Token not matched'})
        }
        req.userId = decodedToken.id
        next()
       } catch (error) {
        console.log(error.message)
        return res.status(401).json({msg: 'Unauthorized Access or JWT Token not provided'})
       }
}

module.exports = {
    verifyToken
}