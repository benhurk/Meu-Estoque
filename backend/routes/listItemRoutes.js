import express from 'express';
import {
    getAllListItems,
    addNewListItem,
} from '../controllers/listItemController.js';

const router = express.Router();

router.get('/', getAllListItems);
router.post('/', addNewListItem);

export default router;
