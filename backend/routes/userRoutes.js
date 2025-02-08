import express from 'express';
import {
    getAllUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
