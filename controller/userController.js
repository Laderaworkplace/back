import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

const userRegistration = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the inputs" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please Enter the strong password" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please Enter the Valid mail" })
        }
        const salt = await bcrypt.genSalt(10);
        const hassingPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, email, password: hassingPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
        res.status(200).json({ success: true, token })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

}

const loginProfile = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "use is not found in the databse" })
        }
        const matchingPassword = await bcrypt.compare(password, user.password)
        if (matchingPassword) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
            res.status(200).json({ success: true, token })
        }
        
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}
export {
    userRegistration,
    loginProfile
}