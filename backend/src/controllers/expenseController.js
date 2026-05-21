import prisma from '../config/prisma.js';

export const createExpense = async (req, res) => {

  try {

    const {
      amount,
      purpose,
      sourceType,
      handledBy
    } = req.body;

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        purpose,
        sourceType,
        handledBy
      }
    });

    res.json({
      success: true,
      expense
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};