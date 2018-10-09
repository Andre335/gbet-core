const User = require('../user/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

exports.login = async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await User.findOne({email});

    if(!user){
        return res.status(404).send({error: 'User not found'});
    }

    if(!await bcrypt.compareSync(password, user.password)){
        return res.status(400).send({error: 'Password is incorrect'});
    }

    jwt.sign({id: user.id}, authConfig.secret , { expiresIn: '2h' }, (error, TOKEN) => {
        if (error) return res.status(500).json({ error: 'ERROR SIGNING THE TOKEN' });
        res.cookie('access_token', TOKEN, {
          maxAge: new Date(Date.now() + 1000000),
          httpOnly: false,
        });
        return res.status(200).json({ message: 'User logged with success' });
    });
}

exports.logOut = (req, res, next) => {
    res.clearCookie('access_token', req.cookies.access_token, {
      maxAge: new Date(Date.now() + 10000000),
      httpOnly: false,
    });
    return res.status(200).json({ message: 'Cookie deleted' });
};