const express = require('express');
const router = express.Router()
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

//1. 회원가입 endpoint
router.post("/", userController.createUser);

//2. 로그인
router.post("/login", userController.loginWithEmail);

router.put("/", userController.updateUserPassword); 
router.delete("/", userController.deleteUser);

//토큰을 통해 유저 id 빼냄 -> 그 아이디로 유저 객체 찾아서 보내주기
router.get("/me", authController.authenticate, userController.getUser);


module.exports = router;
