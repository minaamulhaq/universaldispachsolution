import { Contact } from '../model/contact-model.js';
const contactpage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const contactData = await Contact.create({
            name,
            email,
            phone,
            message,
        });
        res.status(200).json({ message: 'Contact created successfully', data: contactData });
    } catch (err) {
        next(err);
    }
}
export { contactpage };