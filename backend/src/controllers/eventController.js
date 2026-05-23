import prisma from '../config/prisma.js';

export const createEvent = async (req, res) => {

  try {

    const {
      title,
      description,
      eventDate,
      location,
      bannerImage
    } = req.body;

    const event =
      await prisma.event.create({

        data: {

          title,

          description,

          eventDate:
            new Date(eventDate),

          location,

          bannerImage

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

    const events =
      await prisma.event.findMany({

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