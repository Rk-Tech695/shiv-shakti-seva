import prisma from '../config/prisma.js';

export const getFinanceSummary =
  async (req, res) => {

    try {

      const donations =
        await prisma.donation.findMany({

          include: {

            user: true

          },

          orderBy: {

            createdAt: 'desc'

          }

        });

      const expenses =
        await prisma.expense.findMany({

          orderBy: {

            createdAt: 'desc'

          }

        });

      let cashDonation = 0;

      let bankDonation = 0;

      donations.forEach(donation => {

        // 😄 ONLY SUCCESS COUNT

        if (
          donation.status !== 'SUCCESS'
        ) {
          return;
        }

        if (
          donation.paymentMode === 'CASH'
        ) {

          cashDonation += donation.amount;

        } else {

          bankDonation += donation.amount;

        }

      });

      let cashExpense = 0;

      let bankExpense = 0;

      expenses.forEach(expense => {

        if (
          expense.sourceType === 'CASH'
        ) {

          cashExpense += expense.amount;

        } else {

          bankExpense += expense.amount;

        }

      });

      const cashAvailable =
  cashDonation - cashExpense;

const bankAvailable =
  bankDonation - bankExpense;

// 😄 YAHAN
const totalBalance =
  cashAvailable + bankAvailable;

res.json({

  cashAvailable,

  bankAvailable,

  totalDonation:

    cashDonation +
    bankDonation,

  totalExpense:

    cashExpense +
    bankExpense,

  // 😄 YAHAN
  totalBalance,

  donations,

  expenses

});

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };
// import prisma from '../config/prisma.js';

// export const getFinanceSummary = async (req, res) => {

//   try {

//     const donations = await prisma.donation.findMany({

//       include: {
//         user: true
//       },

//       orderBy: {
//         createdAt: 'desc'
//       }

//     });

//     const expenses = await prisma.expense.findMany({

//       orderBy: {
//         createdAt: 'desc'
//       }

//     });

//     let cashDonation = 0;
//     let bankDonation = 0;
//     let upiDonation = 0;

//     donations.forEach(donation => {

//       if (donation.status !== 'SUCCESS') {
//         return;
//       }

//       if (donation.paymentMode === 'CASH') {

//         cashDonation += donation.amount;

//       }

//       else if (
//         donation.paymentMode === 'BANK_TRANSFER'
//       ) {

//         bankDonation += donation.amount;

//       }

//       else {

//         upiDonation += donation.amount;

//       }

//     });

//     let cashExpense = 0;
//     let bankExpense = 0;

//     expenses.forEach(expense => {

//       if (expense.sourceType === 'CASH') {

//         cashExpense += expense.amount;

//       }

//       else {

//         bankExpense += expense.amount;

//       }

//     });

//     res.json({

//       cashAvailable:
//         cashDonation - cashExpense,

//       bankAvailable:
//         bankDonation - bankExpense,

//       upiAvailable:
//         upiDonation,

//       totalDonation:
//         cashDonation +
//         bankDonation +
//         upiDonation,

//       totalExpense:
//         cashExpense +
//         bankExpense,

//       donations,

//       expenses

//     });

//   } catch (error) {

//     res.status(500).json({

//       success: false,

//       message: error.message

//     });

//   }

// };