import { Services } from "../model/services-model.js";
const adminServices = async (req, res) => {
    try {

        const serviceData = await Services.find();
        if (!serviceData) {
            res.status(400).json({ message: "Daa Not found" });
        }
        res.status(200).json(serviceData);

    } catch (error) {
        console.log("Error From user data", error);
    }
}
export { adminServices };