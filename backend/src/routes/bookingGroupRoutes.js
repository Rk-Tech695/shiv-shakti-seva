import express from 'express';

import {

  createBookingGroup,

  getAllBookings,

  searchBookingByPNR

} from '../controllers/bookingGroupController.js';

const router = express.Router();

router.post('/', createBookingGroup);

router.get('/', getAllBookings);


router.get('/pnr/:pnr', searchBookingByPNR);

export default router;