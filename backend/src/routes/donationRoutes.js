import express from 'express';
import upload from '../middleware/upload.js';

import {
  createDonation,
  approveDonation
} from '../controllers/donationController.js';

const router = express.Router();

// router.post('/', createDonation);
router.post('/',upload.single('proofImage'),createDonation);
router.put('/approve/:id',approveDonation);

export default router;