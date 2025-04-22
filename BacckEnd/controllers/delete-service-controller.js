import { Services } from "../model/services-model.js";


const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Services.deleteOne({ _id: id });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
export { deleteService };