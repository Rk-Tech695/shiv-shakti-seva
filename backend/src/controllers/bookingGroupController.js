
import prisma from '../config/prisma.js';

import generatePNR from '../utils/generatePNR.js';

export const createBookingGroup = async (req, res) => {

  try {

    const {
      mobileNumber,
      eventId,
      devotees
    } = req.body;

    if (!devotees || devotees.length === 0) {

  return res.status(400).json({

    success: false,

    message: 'At least 1 devotee required'

  });

}

if (!/^[0-9]{10}$/.test(mobileNumber)) {

  return res.status(400).json({

    success: false,

    message: 'Invalid mobile number'

  });

}

const duplicateDevotees =
  devotees.some((devotee, index) => {

    return devotees.findIndex(d =>

      d.name.trim().toLowerCase() ===
      devotee.name.trim().toLowerCase()

      &&

      parseInt(d.age) ===
      parseInt(devotee.age)

      &&

      d.gender === devotee.gender

    ) !== index;

  });

if (duplicateDevotees) {

  return res.status(400).json({

    success: false,

    message:
      'Duplicate devotee entries found'

  });

}

    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(eventId)
      }
    });

    if (!event) {

      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });

    }

    if (!event.slotEnabled) {

      return res.status(400).json({
        success: false,
        message: 'Slots Closed'
      });

    }

    const settings = await prisma.appSetting.findFirst();

    const maxLimit =
      settings?.maxDevoteesPerBooking || 5;

    if (devotees.length > maxLimit) {

      return res.status(400).json({
        success: false,
        message: `Maximum ${maxLimit} devotees allowed`
      });

    }
    const existingBookings =
  await prisma.bookingGroup.findMany({

    where: {

      mobileNumber,

      eventId: parseInt(eventId)

    }

  });

let alreadyBooked = 0;

existingBookings.forEach(booking => {

  alreadyBooked += booking.totalPersons;

});

const totalAfterBooking =
  alreadyBooked + devotees.length;

if (totalAfterBooking > maxLimit) {

  return res.status(400).json({

    success: false,

    message:
      `You already booked ${alreadyBooked} devotees for this event. Only ${
        maxLimit - alreadyBooked
      } more allowed.`

  });

}

    const remainingSlots =
      event.totalSlots - event.bookedSlots;

    if (devotees.length > remainingSlots) {

      return res.status(400).json({
        success: false,
        message: 'Not enough slots available'
      });

    }

    let pnr;
let exists = true;

while (exists) {

  pnr = generatePNR();

  const existing =
    await prisma.bookingGroup.findUnique({

      where: { pnr }

    });

  if (!existing) {
    exists = false;
  }

}

    const bookingGroup =
      await prisma.bookingGroup.create({

        data: {

          pnr,

          mobileNumber,

          totalPersons: devotees.length,

          eventId: parseInt(eventId),

          devotees: {

            create: devotees.map(devotee => ({

  name: devotee.name.trim(),

  age: parseInt(devotee.age),

  gender: devotee.gender,

  mobileNumber

}))

          }

        },

        include: {

          devotees: true,

          event: true

        }

      });

    await prisma.event.update({

      where: {
        id: parseInt(eventId)
      },

      data: {

        bookedSlots: {
          increment: devotees.length
        }

      }

    });

    const updatedEvent =
      await prisma.event.findUnique({

        where: {
          id: parseInt(eventId)
        }

      });

    if (
      updatedEvent.bookedSlots >=
      updatedEvent.totalSlots
    ) {

      await prisma.event.update({

        where: {
          id: updatedEvent.id
        },

        data: {
          slotEnabled: false
        }

      });

    }

    res.json({

      success: true,

      bookingGroup

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.code === 'P2002'
    ? 'PNR conflict. Try again.'
    : 'Booking failed'

    });

  }

  

};
export const getAllBookings = async (req, res) => {

  try {

    const bookings =
      await prisma.bookingGroup.findMany({

        include: {

          devotees: true,

          event: true

        },

        orderBy: {

          createdAt: 'desc'

        }

      });

    res.json({

      success: true,

      bookings

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: 'Failed to fetch bookings'

    });

  }

};

export const searchBookingByPNR = async (req, res) => {

  try {

    const { pnr } = req.params;

    const booking =
      await prisma.bookingGroup.findUnique({

        where: { pnr },

        include: {

          devotees: true,

          event: true

        }

      });

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: 'PNR not found'

      });

    }

    res.json({

      success: true,

      booking

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: 'Search failed'

    });

  }

};