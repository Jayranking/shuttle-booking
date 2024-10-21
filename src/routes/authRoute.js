const authCont = require('../controllers/authCont');
const route = require('express').Router();
const {profileHandler} = require('../helpers/img_handler')

// auth route 
route.post('/register', profileHandler, authCont.register);
route.post('/login', authCont.login);
route.get('/user-logout', authCont.user_logout);




module.exports = route;

"pk.eyJ1IjoiamF5cmFua2luZyIsImEiOiJjbHpuMHNhamwwZml0Mmlxd2V4b2pxMDU0In0.EBr3qDcgmiPHoure2GESeg";