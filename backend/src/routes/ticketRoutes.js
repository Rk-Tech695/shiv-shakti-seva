import express from 'express';

import {

  downloadTicket

} from '../controllers/ticketController.js';

const router = express.Router();

router.get(
  '/:pnr',
  downloadTicket
);

export default router;