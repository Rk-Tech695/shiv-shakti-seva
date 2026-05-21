import prisma from '../config/prisma.js';

export const createBooking = async (req, res) => {

  try {

    const {
      name,
      mobile,
      eventId
    } = req.body;

    let user = await prisma.user.findUnique({
      where: {
        mobile_number: mobile
      }
    });

    if (!user) {

      user = await prisma.user.create({
        data: {
          name,
          mobile_number: mobile
        }
      });

    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        eventId: parseInt(eventId)
      }
    });

    res.json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const getBookings = async (req, res) => {

  try {

    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        event: true
      }
    });

    res.json(bookings);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};