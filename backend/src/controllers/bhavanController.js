import prisma from '../config/prisma.js';

export const createBhavanBooking =
  async (req, res) => {

    try {

      const {

        groupName,

        mobileNumber,

        totalPersons,

        totalMales,

        totalFemales,

        jalDate,

        arrivalDate,

        departureDate,

        note,

        devotees

      } = req.body;

      const booking =
        await prisma.bhavanBooking.create({

          data: {

            groupName:
              groupName || null,

            mobileNumber,

            totalPersons:
              parseInt(totalPersons),

            totalMales:
              parseInt(totalMales),

            totalFemales:
              parseInt(totalFemales),

            jalDate:
              new Date(jalDate),

            arrivalDate:
              new Date(arrivalDate),

            departureDate:
              new Date(departureDate),

            note,

            devotees: {

              create:
                devotees.map(devotee => ({

                  name:
                    devotee.name,

                  gender:
                    devotee.gender,

                  age:
                    parseInt(devotee.age),

                  dob:
                    devotee.dob
                      ? new Date(devotee.dob)
                      : null,

                  mobile:
                    devotee.mobile || null

                }))

            }

          },

          include: {

            devotees: true

          }

        });

      res.json({

        success: true,

        booking

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };

export const getBhavanBookings =
  async (req, res) => {

    try {

      const bookings =
        await prisma.bhavanBooking.findMany({

          include: {

            devotees: true,

            assignedRoom: true

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

        message: error.message

      });

    }

  };

export const approveBhavanBooking =
  async (req, res) => {

    try {

      const {

        bookingId,

        roomId

      } = req.body;

      const room =
        await prisma.bhavanRoom.findUnique({

          where: {

            id: parseInt(roomId)

          }

        });

      if (!room) {

        return res.status(404).json({

          success: false,

          message: 'Room not found'

        });

      }

      const booking =
        await prisma.bhavanBooking.findUnique({

          where: {

            id: parseInt(bookingId)

          }

        });

      if (!booking) {

        return res.status(404).json({

          success: false,

          message: 'Booking not found'

        });

      }

      await prisma.bhavanBooking.update({

        where: {

          id: parseInt(bookingId)

        },

        data: {

          status: 'APPROVED',

          assignedRoomId:
            parseInt(roomId)

        }

      });

      await prisma.bhavanRoom.update({

        where: {

          id: parseInt(roomId)

        },

        data: {

          occupiedBeds: {

            increment:
              booking.totalPersons

          }

        }

      });

      console.log(

        `WhatsApp Send:
        Approved Booking
          for ${booking.mobileNumber}`

      );

      res.json({

        success: true

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };

export const rejectBhavanBooking =
  async (req, res) => {

    try {

      await prisma.bhavanBooking.update({

        where: {

          id: parseInt(req.params.id)

        },

        data: {

          status: 'REJECTED'

        }

      });

      res.json({

        success: true

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };

export const createBhavanRoom =
  async (req, res) => {

    try {

      const {

        name,

        type,

        totalBeds,

        isHall

      } = req.body;

      const room =
        await prisma.bhavanRoom.create({

          data: {

            name,

            type,

            totalBeds:
              parseInt(totalBeds),

            isHall

          }

        });

      res.json({

        success: true,

        room

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };

export const getBhavanRooms =
  async (req, res) => {

    try {

      const rooms =
        await prisma.bhavanRoom.findMany({

          orderBy: {

            createdAt: 'desc'

          }

        });

      res.json({

        success: true,

        rooms

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };

  export const getBhavanSettings =
  async (req, res) => {

    try {

      let setting =
        await prisma.appSetting.findFirst();

      if (!setting) {

        setting =
          await prisma.appSetting.create({

            data: {}

          });

      }

      res.json({

        success: true,

        setting

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };

export const updateBhavanSettings =
  async (req, res) => {

    try {

      const {

        bhavanBookingEnabled,

        bhavanBookingMessage

      } = req.body;

      const setting =
        await prisma.appSetting.upsert({

          where: {

            id: 1

          },

          update: {

            bhavanBookingEnabled,

            bhavanBookingMessage

          },

          create: {

            id: 1,

            bhavanBookingEnabled,

            bhavanBookingMessage

          }

        });

      res.json({

        success: true,

        setting

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };

  export const checkoutBhavanBooking =
  async (req, res) => {

    try {

      const { bookingId } =
        req.body;

      const booking =
        await prisma.bhavanBooking.findUnique({

          where: {

            id:
              parseInt(bookingId)

          }

        });

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            'Booking Not Found'

        });

      }

      if (
        booking.assignedRoomId
      ) {

        await prisma.bhavanRoom.update({

          where: {

            id:
              booking.assignedRoomId

          },

          data: {

            occupiedBeds: {

              decrement:
                booking.totalPersons

            }

          }

        });

      }

      await prisma.bhavanBooking.update({

        where: {

          id:
            booking.id

        },

        data: {

          status:
            'COMPLETED',

          checkoutAt:
            new Date()

        }

      });

      res.json({

        success: true

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message

      });

    }

  };