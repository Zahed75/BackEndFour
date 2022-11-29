var jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let Token = req.headers['token']
    jwt.verify(Token, "SecretKey123456789", function (err, decoded) {
        if (err) {
            console.log(Token)
            res.status(401).json({status: "Unauthorized!"})
        } else {
            let phone = decoded['data']
            console.log('phone')
            req.headers.phone = phone
            next();
        }
    })
}