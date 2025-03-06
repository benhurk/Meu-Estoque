import express from 'express';

import {
    getAllUserLogs,
    getUserLogs,
    deleteLog,
} from '../controllers/logsController.js';

const router = express.Router();

router.get('/', getAllUserLogs);
router.get('/:month', getUserLogs);
router.delete('/:id', deleteLog);

export default router;
