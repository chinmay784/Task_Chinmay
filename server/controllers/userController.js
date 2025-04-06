const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneno } = req.body;

        if (!name || !email || !password || !phoneno) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        let user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                sucess: false,
                message: "User Already Exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPasswoRd = await bcrypt.hash(password, salt);

        user = new UserModel({
            name,
            email,
            password: hashPasswoRd,
            phoneno,
            profilePic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        })

        await user.save();

        return res.status(200).json({
            sucess: true,
            message: "User Registered Successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Error in register user",
        });
    }
};



exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                sucess: false,
                message: "User Not Found"
            })
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                sucess: false,
                message: "Invalid Password"
            })
        }


        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { "expiresIn": "5d" })

        return res.status(200).json({
            sucess: true,
            message: "User Login Successfully",
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Error in login user",
        });

    }
}



exports.profile = async (req, res) => {
    try {

        const user = await UserModel.findById(req.user.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({
            sucess: true,
            message: "User Profile",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Error in profile user",
        });
    }
}