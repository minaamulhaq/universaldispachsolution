import { User } from "../model/user-model.js";

const home = async (req, res) => {
    try {
        res.status(200).send("Hello from auth controller!");

    } catch (err) {
        console.log(err);
    }
}
const register = async (req, res) => {
    // Handle login logic here
    try {
        const { name, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const userData = await User.create({
            name,
            email,
            phone,
            password,
        });

        // console.log(req.body);
        res.status(200).json({ message: "Register Successfully", token: userData.genratedToken(), id: userData._id.toString() });

    } catch (err) {
        // console.log(err);
        next(err);
    }
}
const login = async (req, res) => {
    // Handle login logic here
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await userData.comparePassword(password);
        // console.log(isMatch);


        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "login Successfully", token: userData.genratedToken(), id: userData._id.toString() });
    } catch (err) {
        next(err);
    }
}
const user = async (req, res) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData });
    } catch (error) {
        console.log("Error From user data", error);

    }
}
export { home, register, login, user };