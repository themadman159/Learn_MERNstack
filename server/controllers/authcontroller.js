const jwt = require('jsonwebtoken')
const { expressjwt: expressJWT } = require("express-jwt");


exports.login = ( req, res ) => {

    const { username , password } = req.body

    if ( password === process.env.PASSWORD ) {
        const token = jwt.sign({username},process.env.JWT_TOKEN,{expiresIn: "1d"})
        console.log({username  , password , status: "Login successful"});
        return res.json({token , username, status: "Login successful"})
    } else {
        return res.status(400).json({error: "รหัสผ่านไม่ถูกต้อง" , status : "Login failed"})
    }
}

exports.requireLogin = expressJWT({
    secret: process.env.JWT_TOKEN,
    algorithms: ['HS256'],
    userProperty: 'auth'
  });