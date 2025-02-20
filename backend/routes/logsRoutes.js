import express from 'express';

import { getUserLogs, deleteLog } from '../controllers/logsController.js';

const router = express.Router();

router.get('/', getUserLogs);
router.delete('/:id', deleteLog);

export default router;
