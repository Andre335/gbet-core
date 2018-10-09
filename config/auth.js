const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const User = require('../user/user.model')

exports.auth = (req, res, next) =>{
    if (!req.cookies.access_token) {
        return res.status(401).json({ error: 'Unauthorized, request token.' });
      }
      const token = req.cookies.access_token;
      jwt.verify(token, authConfig.secret , (error, userData) => {
        if (error) return res.status(422).json({ error });

        req.userId = userData.id;
        next();
    });
}

exports.authorizeByRole = async (req, res, next) => {
    const authUser = await User.findById(req.userId);
    const role = authUser.role;
    if (role) {
      if (role === "ADMIN") {
        next();
      } else {
        res.status(403).send({mensage: "You have to be an admin for this functionality."});
      }
  
    } else {
      res.status(400).send({mensage: "Undefined role."});
    }
};