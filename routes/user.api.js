const express = require('express');
const router = express.Router()
const userController = require('../controller/user.controller');

//1. 회원가입 endpoint
router.post("/", userController.createUser);

//2. 로그인
router.post("/login", userController.loginWithEmail);

router.put("/", userController.updateUserPassword); 
router.delete("/", userController.deleteUser);


module.exports = router;
