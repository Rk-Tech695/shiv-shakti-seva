import express from 'express';

import {

  createBhavanBooking,

  getBhavanBookings,

  approveBhavanBooking,

  rejectBhavanBooking,

  createBhavanRoom,

  getBhavanRooms,

  getBhavanSettings,

  updateBhavanSettings,
  
  checkoutBhavanBooking

} from '../controllers/bhavanController.js';

const router = express.Router();

router.post(
  '/booking',
  createBhavanBooking
);

router.get(
  '/bookings',
  getBhavanBookings
);

router.put(
  '/approve',
  approveBhavanBooking
);

router.put(
  '/reject/:id',
  rejectBhavanBooking
);

router.post(
  '/rooms',
  createBhavanRoom
);

router.get(
  '/rooms',
  getBhavanRooms
);

router.get(
  '/settings',
  getBhavanSettings
);

router.put(
  '/settings',
  updateBhavanSettings
);

router.put(
  '/checkout',
  checkoutBhavanBooking
);

export default router;