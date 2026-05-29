import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import trusteeRoutes from './routes/trusteeRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import bookingGroupRoutes from './routes/bookingGroupRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import receiptRoutes from './routes/receiptRoutes.js';
import bhavanRoutes from './routes/bhavanRoutes.js';
import './cron/birthdayCron.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

app.use('/uploads', express.static('uploads'));

app.use('/api/admin', authRoutes);

app.use('/api/bookings', bookingRoutes);

app.use('/api/donations', donationRoutes);

app.use('/api/events', eventRoutes);

app.use('/api/finances', financeRoutes);

app.use('/api/expenses', expenseRoutes);

app.use('/api/payments', paymentRoutes);

app.use('/api/trustees', trusteeRoutes);

// app.use('/api/booking-groups', bookingGroupRoutes);

app.use('/api/tickets', ticketRoutes);

app.use('/api/receipts',receiptRoutes);

app.use('/api/bhavan',bhavanRoutes);

app.use('/api/users', userRoutes);


export default app;