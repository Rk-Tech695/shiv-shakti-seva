import prisma from '../config/prisma.js';

import generateTicketPdf
  from '../utils/generateTicketPdf.js';

export const downloadTicket =
  async (req, res) => {

    try {

      const { pnr } = req.params;

      const booking =
        await prisma.bookingGroup.findUnique({

          where: {
            pnr
          },

          include: {

            event: true,

            devotees: true

          }

        });

      if (!booking) {

        return res.status(404).json({

          success: false,

          message: 'Ticket not found'

        });

      }

      const pdfBuffer =
        await generateTicketPdf(
          booking
        );

      res.setHeader(
        'Content-Type',
        'application/pdf'
      );

      res.setHeader(

        'Content-Disposition',

        `attachment; filename=${pnr}.pdf`

      );

      res.send(pdfBuffer);

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };