import express from 'express';
import {
    getAllUserItems,
    addNewItem,
    editItem,
    deleteItem,
    deleteSelectedItems,
    deleteAllItems,
} from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getAllUserItems);
router.post('/', addNewItem);
router.put('/:id', editItem);
router.delete('/', deleteAllItems);
router.delete('/x', deleteSelectedItems);
router.delete('/:id', deleteItem);

export default router;
