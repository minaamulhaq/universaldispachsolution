import { z } from "zod";
const signUpSchema = z.object({
    name: z
        .string()
        .trim()
        .nonempty({ message: "Name is required" })
        .min(3, { message: "Name should be at least 3 characters long" })
        .max(50, { message: "Name should not exceed 50 characters" }),
    email: z
        .string()
        .trim()
        .nonempty({ message: "Email is required" })
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email should be at least 5 characters long" })
        .max(50, { message: "Email should not exceed 50 characters" }),
    phone: z
        .string()
        .trim()
        .nonempty({ message: "Phone is required" })
        .min(10, { message: "Phone should be at least 10 characters long" })
        .max(15, { message: "Phone should not exceed 15 characters" }),
    password: z
        .string()
        .trim()
        .nonempty({ message: "Password is required" })
        .min(6, { message: "Password should be at least 6 characters long" })
        .max(20, { message: "Password should not exceed 20 characters" }),

})
export { signUpSchema };