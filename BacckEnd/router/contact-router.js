import { Router } from 'express';
import { contactpage } from '../controllers/contact-controller.js';

const router = Router();

router.route('/contact').post(contactpage);

export { router };