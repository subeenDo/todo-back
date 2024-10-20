const User = require("../model/User");
const bcrypt = require("bcrypt")
const saltRounds = 10;

const userController = {}

//user 추가
userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            throw new Error('All fields are required');
        }
        const user = await User.findOne({ email });
        if (user) {
            throw new Error('Email is already registered');
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({ email, name, password: hash });
        await newUser.save();
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

// user 로그인
userController.loginWithEmail = async (req, res) => {
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email}, "-createdAt -updatedAt -__v");
        if(user){
            const isMatch = bcrypt.compareSync(password, user.password)
            if(isMatch){
                const token = user.generateToken();
                return res.status(200).json({status:"success", user, token})
            }
        }
        throw new Error ("아이디 또는 비밀번호가 일치하지 않습니다")
    }catch(error){
        res.status(400).json({status:"fail", message:error.message})
    }
};

// user 비밀번호 변경
userController.updateUserPassword = async (req, res) => {
    try {
        const { email, password, newPassword, confirmPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email is not found');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new Error('Current password is not correct');
        }

        if (newPassword !== confirmPassword) {
            throw new Error('Password do not match');
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(newPassword, salt);

        user.password = hash;
        await user.save();
        res.status(200).json({ status: "success", message: "Password updated success" });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

//user 삭제
userController.deleteUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new Error('Password is incorrect');
        }

        await User.deleteOne({ email });

        res.status(200).json({ status: "success", message: "User deleted successfully", result: true });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message, result: false });
    }
};



module.exports = userController