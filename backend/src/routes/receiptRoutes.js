import express from 'express';

import {
  generateDonationReceipt
}
from '../controllers/receiptController.js';

const router = express.Router();

router.get(
  '/:id',
  generateDonationReceipt
);

export default router;

// import express from 'express';

// import {

//   downloadReceipt

// } from '../controllers/receiptController.js';

// const router =
//   express.Router();

// router.get(
//   '/:id',
//   downloadReceipt
// );

// export default router;