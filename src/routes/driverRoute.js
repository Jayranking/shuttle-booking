const express = require("express");
const driverCont = require('../controllers/driverCont');
const {profileHandler} = require('../helpers/img_handler');
const { checkDriver } = require('../middlewares/authMiddleware')


const driverRouter = express.Router();

driverRouter.get('/dashboard', checkDriver, driverCont.get_dashboard);

driverRouter.get('/vehicle',checkDriver, driverCont.get_vehicle);
driverRouter.post('/vehicle', checkDriver, profileHandler, driverCont.post_vehicle);

driverRouter.get('/register-vehicle',checkDriver, driverCont.register_vehicle);

driverRouter.get('/bookings', checkDriver, driverCont.bookings);

driverRouter.get('/change-password', checkDriver, driverCont.change_password);
driverRouter.post('/change-password', checkDriver, driverCont.changePassword);

driverRouter.get('/profile',checkDriver, driverCont.profile);

module.exports = driverRouter;