const express  = require("express");
const pageCont = require('../controllers/pageCont');


const router = express.Router();

router.get('/', pageCont.get_home);
router.get('/shuttles', pageCont.get_shuttles); 
router.get('/register', pageCont.get_register);
router.get('/login', pageCont.get_login);
router.get('/details', pageCont.details);

router.get('/booking', pageCont.booking);
router.post('/booking', pageCont.post_booking);
router.get('/ticket', pageCont.ticket);

module.exports = router;