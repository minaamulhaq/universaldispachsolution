import { User } from "../model/user-model.js";
const adminUser = async (req, res) => {

    try {

        const userData = await User.find({}, { password: 0, __v: 0 });
        if (!userData) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json(userData);

    } catch (error) {
        consol.log("Error From user data", error);
        res.status(500).json({ message: "Internal server error", error });

    }

}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await User.deleteOne({ _id: id });
        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const response = await User.updateOne({ _id: id }, { $set: updatedData });
        if (response.matchedCount === 0) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service updated successfully" });
    } catch (error) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export { adminUser, deleteUser, updateUser };