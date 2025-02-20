import express from 'express';

import { deleteLog } from '../controllers/logsController.js';

const router = express.Router();

router.delete('/:id', deleteLog);

export default router;
