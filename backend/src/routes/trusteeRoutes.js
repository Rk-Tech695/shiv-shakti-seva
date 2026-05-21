import express from 'express';

import {
  createTrustee
} from '../controllers/trusteeController.js';

const router = express.Router();

router.post('/', createTrustee);

export default router;