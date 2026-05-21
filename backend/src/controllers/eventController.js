import prisma from '../config/prisma.js';

export const createEvent = async (req, res) => {

  try {

    const {
      title,
      description,
      eventDate,
      location,
      totalSlots
    } = req.body;

    const event = await prisma.event.create({

      data: {

        title,

        description,

        eventDate: new Date(eventDate),

        location,

        totalSlots: parseInt(totalSlots)

      }

    });

    res.json({

      success: true,

      event

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

export const getEvents = async (req, res) => {

  try {

    const events = await prisma.event.findMany({

      include: {

        bookingGroups: {

          include: {

            devotees: true

          }

        }

      },

      orderBy: {

        createdAt: 'desc'

      }

    });

    res.json(events);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};