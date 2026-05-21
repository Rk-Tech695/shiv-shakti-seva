import express from 'express';

import {
  getFinanceSummary
} from '../controllers/financeController.js';

const router = express.Router();

router.get('/', getFinanceSummary);

export default router;