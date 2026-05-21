// import express from 'express';
// import cors from 'cors';
// import * as dotenv from 'dotenv';
// import { PrismaClient } from '@prisma/client';
// import cron from 'node-cron';
// import * as mariadb from 'mariadb';
// import { PrismaMariaDb } from '@prisma/adapter-mariadb';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';

// dotenv.config();

// const dbUrl = process.env.DATABASE_URL.replace('mysql://', 'mariadb://');
// const pool = mariadb.createPool(dbUrl);
// const adapter = new PrismaMariaDb(pool);
// const prisma = new PrismaClient({ adapter });

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Razorpay Instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy123',
//   key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
// });

// // Seed Admin User
// async function seedAdmin() {
//   try {
//     const adminExists = await prisma.admin.findUnique({ where: { username: 'shiva@shiva' } });
//     if (!adminExists) {
//       await prisma.admin.create({
//         data: { username: 'shiva@shiva', password: 'shiva@test123' } 
//       });
//       console.log('Admin user seeded.');
//     }
//   } catch(e) {
//     console.error("Admin seed failed:", e.message);
//   }
// }
// seedAdmin();

// // --- Auth Routes ---
// app.post('/api/admin/login', async (req, res) => {
//   const { username, password } = req.body;
//   const admin = await prisma.admin.findUnique({ where: { username } });
//   if (admin && admin.password === password) {
//     res.json({ success: true, message: 'Logged in successfully', token: 'dummy_jwt_token' });
//   } else {
//     res.status(401).json({ success: false, message: 'Invalid credentials' });
//   }
// });

// // --- User Routes ---
// app.get('/api/users', async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// // --- Event Routes ---
// app.get('/api/events', async (req, res) => {
//   const events = await prisma.event.findMany({ include: { bookings: true } });
//   res.json(events);
// });

// app.post('/api/events', async (req, res) => {
//   const { title, description, eventDate, location } = req.body;
//   const newEvent = await prisma.event.create({
//     data: { title, description, eventDate: new Date(eventDate), location }
//   });
//   res.status(201).json(newEvent);
// });

// // --- Booking Routes ---
// app.post('/api/bookings', async (req, res) => {
//   const { name, mobile, eventId } = req.body;
//   try {
//     let user = await prisma.user.findUnique({ where: { mobile_number: mobile } });
//     if (!user) {
//       user = await prisma.user.create({ data: { name, mobile_number: mobile } });
//     }
//     const booking = await prisma.booking.create({
//       data: { userId: user.id, eventId: parseInt(eventId) }
//     });
//     res.json({ success: true, booking });
//   } catch(e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // --- Razorpay & Donation Routes ---
// app.post('/api/payment/create', async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const options = {
//       amount: amount * 100, // paise
//       currency: "INR",
//       receipt: "receipt_" + Math.random().toString(36).substring(7)
//     };
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post('/api/donations', async (req, res) => {
//   try {
//     const { name, mobile, amount, mode, transactionId } = req.body;
//     let user = await prisma.user.findUnique({ where: { mobile_number: mobile } });
//     if (!user) {
//       user = await prisma.user.create({ data: { name, mobile_number: mobile, whatsapp_number: mobile } });
//     }
    
//     const donation = await prisma.donation.create({
//       data: {
//         userId: user.id,
//         amount: parseFloat(amount),
//         paymentMode: mode,
//         status: 'SUCCESS',
//         transactionId
//       }
//     });

//     await prisma.user.update({
//       where: { id: user.id },
//       data: { total_donated_amount: { increment: parseFloat(amount) } }
//     });
    
//     console.log(`[Notification] Invoice sent to ${mobile} for ₹${amount}`);
//     res.json({ success: true, donation });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // --- Finance & Expense Routes ---
// app.get('/api/finances', async (req, res) => {
//   try {
//     const donations = await prisma.donation.findMany({ where: { status: 'SUCCESS' }, include: { user: true } });
//     const expenses = await prisma.expense.findMany();
    
//     let totalCashDonations = 0;
//     let totalBankDonations = 0;
//     donations.forEach(d => {
//       if (d.paymentMode === 'CASH') totalCashDonations += d.amount;
//       else totalBankDonations += d.amount;
//     });

//     let totalCashExpenses = 0;
//     let totalBankExpenses = 0;
//     expenses.forEach(e => {
//       if (e.sourceType === 'CASH') totalCashExpenses += e.amount;
//       else totalBankExpenses += e.amount;
//     });

//     res.json({
//       cashAvailable: totalCashDonations - totalCashExpenses,
//       bankAvailable: totalBankDonations - totalBankExpenses,
//       expenses,
//       donations
//     });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// app.post('/api/expenses', async (req, res) => {
//   try {
//     const { amount, purpose, sourceType, handledBy } = req.body;
//     const expense = await prisma.expense.create({
//       data: { amount: parseFloat(amount), purpose, sourceType, handledBy }
//     });
//     res.json({ success: true, expense });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // --- Cron Job ---
// cron.schedule('0 0 * * *', async () => {
//   const today = new Date();
//   const users = await prisma.user.findMany({ where: { dob: { not: null } } });
//   const bdayUsers = users.filter(u => new Date(u.dob).getMonth() === today.getMonth() && new Date(u.dob).getDate() === today.getDate());
//   bdayUsers.forEach(u => console.log(`[WhatsApp Mock] Happy Birthday ${u.name}!`));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
