import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const usersechema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

usersechema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    try {
        const user = this;
        const salt = 10;
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);

    }
});

usersechema.methods.genratedToken = function () {
    try {
        const token = jwt.sign({
            id: this._id.toString(),
            name: this.name,
            email: this.email,
            isAdmin: this.isAdmin,

        },
         process.env.JWT_SECRET,
          {
            expiresIn: "30d",
        });
        return token;
    } catch (error) {
        console.log(error);
    }

}
usersechema.methods.comparePassword = async function (password) {
    try {
        const user = this;
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
}

export const User = mongoose.model("User", usersechema);