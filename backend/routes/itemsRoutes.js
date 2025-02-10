import express from 'express';
import { getAllUserItems, addNewItem } from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getAllUserItems);
router.post('/', addNewItem);

export default router;
