import { Services } from "../model/services-model.js";

const updateServices = async (req, res) => {
    const { id } = req.params;
    const updatedDtaa = req.body;
    try {
        const responce = await Services.updateOne({ _id: id }, { $set: updatedDtaa });
        if (responce.matchedCount === 0) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service updated successfully" });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}
export { updateServices };