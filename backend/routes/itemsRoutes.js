import express from 'express';
import {
    getAllUserItems,
    addNewItem,
    uploadItems,
    changeItemQuantity,
    editItem,
    deleteItem,
    deleteAllItems,
} from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getAllUserItems);
router.post('/', addNewItem);
router.post('/upload', uploadItems);
router.put('/quantity/:id', changeItemQuantity);
router.put('/:id', editItem);
router.delete('/:id', deleteItem);
router.delete('/', deleteAllItems);

export default router;
