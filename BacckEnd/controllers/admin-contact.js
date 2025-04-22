import { Contact } from "../model/contact-model.js";
const adminContact = async (req, res) => {
    try {
        const contactData = await Contact.find({});
        if (!contactData) {
            return res.status(400).json({ message: "No contact data found" });
        }
        res.status(200).json(contactData);


    } catch (error) {
        console.log("Error From user data", error);
    }
}
export { adminContact };