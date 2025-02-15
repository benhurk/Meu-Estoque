import express from 'express';
import {
    getAllUserItems,
    addNewItem,
    editItem,
    deleteItem,
} from '../controllers/itemsController.js';

const router = express.Router();

router.get('/', getAllUserItems);
router.post('/', addNewItem);
router.put('/:id', editItem);
router.delete('/:id', deleteItem);

export default router;
