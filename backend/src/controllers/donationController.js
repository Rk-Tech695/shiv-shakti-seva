// import prisma from '../config/prisma.js';

// export const createDonation = async (req, res) => {

//   try {

//     const {
//       name,
//       mobile,
//       amount,
//       mode,
//       dob
//     } = req.body;

//     let user = await prisma.user.findUnique({
//       where: {
//         mobile_number: mobile
//       }
//     });

//     if (!user) {

//       user = await prisma.user.create({
//         data: {
//           name,
//           mobile_number: mobile,
//           dob:dob ? new Date(dob) : null,
//         }
//       });

//     }
//     else {

//   await prisma.user.update({
//     where: {
//       id: user.id
//     },
//     data: {
//       dob: dob ? new Date(dob) : user.dob
//     }
//   });

// }

//     const donation = await prisma.donation.create({
//       data: {
//         userId: user.id,
//         amount: parseFloat(amount),
//         paymentMode: mode,
//         status:
//           mode === 'CASH'
//             ? 'PENDING'
//             : 'SUCCESS',
//         receivedBy:
//           mode === 'CASH'
//             ? req.body.receivedBy
//             : null
//       }
//     });

//     res.json({
//       success: true,
//       donation
//     });

//   } catch (error) {

//     res.status(500).json({
//       error: error.message
//     });

//   }

// };
// export const approveDonation =
//   async (req, res) => {

//     try {

//       const donation =
//         await prisma.donation.update({

//           where: {
//             id: parseInt(req.params.id)
//           },

//           data: {

//             status: 'SUCCESS',

//             verifiedBy: 'ADMIN',

//             verifiedAt: new Date()

//           }

//         });

//       res.json({

//         success: true,

//         donation

//       });

//     } catch (error) {

//       res.status(500).json({

//         success: false,

//         message: error.message

//       });

//     }

//   };

import prisma from '../config/prisma.js';

export const createDonation =
  async (req, res) => {

    try {

      const {

        name,

        mobile,

        amount,

        mode,

        dob,

        transactionId,

        paymentHolderName,

        receivedBy

      } = req.body;

      let user =
        await prisma.user.findUnique({

          where: {

            mobile_number: mobile

          }

        });

      if (!user) {

        user =
          await prisma.user.create({

            data: {

              name,

              mobile_number: mobile,

              dob:
                dob
                  ? new Date(dob)
                  : null

            }

          });

      } else {

        await prisma.user.update({

          where: {

            id: user.id

          },

          data: {

            dob:
              dob
                ? new Date(dob)
                : user.dob

          }

        });

      }

      // 😄 IMAGE PATH

      const proofImage =
        req.file
          ? `/uploads/${req.file.filename}`
          : null;

      // 😄 DONATION CREATE

      const donation =
  await prisma.donation.create({

    data: {

      userId: user.id,

      amount:
        parseFloat(amount),

      paymentMode: mode,

      transactionId,

      paymentHolderName,

      utrNumber:
        transactionId || null,

      proofImage,

      status:
        receivedBy
          ? 'SUCCESS'
          : 'PENDING',

      receivedBy:
        receivedBy || null,

      verifiedBy:
        receivedBy
          ? 'ADMIN'
          : null,

      verifiedAt:
        receivedBy
          ? new Date()
          : null

    },

    include: {

      user: true

    }

  });

// 😄 AUTO UPDATE USER TOTAL

if (receivedBy) {

  await prisma.user.update({

    where: {

      id: user.id

    },

    data: {

      total_donated_amount: {

        increment:
          parseFloat(amount)

      }

    }

  });

}

res.json({

  success: true,

  donation

});

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };
  

export const approveDonation =
  async (req, res) => {

    try {

      const donation =
        await prisma.donation.update({

          where: {

            id: parseInt(
              req.params.id
            )

          },

          data: {

            status: 'SUCCESS',

            verifiedBy: 'ADMIN',

            verifiedAt:
              new Date()

          },

          include: {

            user: true

          }

        });

      // 😄 UPDATE USER TOTAL DONATION

      await prisma.user.update({

        where: {

          id: donation.userId

        },

        data: {

          total_donated_amount: {

            increment:
              donation.amount

          }

        }

      });

      res.json({

        success: true,

        donation

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };

  export const getPendingDonations =
  async (req, res) => {

    try {

      const donations =
        await prisma.donation.findMany({

          where: {

            status: 'PENDING'

          },

          include: {

            user: true

          },

          orderBy: {

            createdAt: 'desc'

          }

        });

      res.json({

        success: true,

        donations

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };