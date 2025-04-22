import { Services } from "../model/services-model.js";
const getServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.status(200).json(services);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export { getServices };