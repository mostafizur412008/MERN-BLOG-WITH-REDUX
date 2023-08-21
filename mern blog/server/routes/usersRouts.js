const express = require('express');
const { getAllusers, RegisterController, LoginController } = require('../controllers/usersController');

//router object
const router = express.Router();

//GET ALL USERS || METHOD GET
router.get('/all-users', getAllusers);

//CREATE USERS || METHOD POST
router.post('/register', RegisterController);

//LOG IN USER || METHOD 
router.post('/login',LoginController);

module.exports = router;