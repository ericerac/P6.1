const express = require('express');
const router = express.Router();
const userControl = require('../controllers/user')

const multer = require('../middleware/multer-config.js');


router.post('/signup', userControl.signup);
router.post('/login', userControl.login);



module.exports = router;