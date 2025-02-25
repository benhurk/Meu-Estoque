import express from 'express';
import {
    getAllUserItems,
    addNewItem,
    uploadItems,
    changeItemQuantity,
    editItem,
    deleteItems,
    deleteAllItems,
} from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getAllUserItems);
router.post('/', addNewItem);
router.post('/upload', uploadItems);
router.put('/quantity/:id', changeItemQuantity);
router.put('/:id', editItem);
router.delete('/', deleteItems);
router.delete('/all', deleteAllItems);

export default router;
