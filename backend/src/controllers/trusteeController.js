import prisma from '../config/prisma.js';

export const createTrustee = async (req, res) => {

  try {

    const trustee = await prisma.trustee.create({
      data: req.body
    });

    res.json({
      success: true,
      trustee
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};