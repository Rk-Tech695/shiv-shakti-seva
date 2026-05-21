import prisma from '../config/prisma.js';

export const getUsers =
  async (req, res) => {

    try {

      const users =
        await prisma.user.findMany({

          include: {

            donations: {

              where: {

                status: 'SUCCESS'

              },

              orderBy: {

                createdAt: 'desc'

              }

            }

          },

          orderBy: {

            createdAt: 'desc'

          }

        });

      res.json(users);

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };
// import prisma from '../config/prisma.js';

// export const getUsers = async (req, res) => {

//   try {

//     const users = await prisma.user.findMany();

//     res.json(users);

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }

// };