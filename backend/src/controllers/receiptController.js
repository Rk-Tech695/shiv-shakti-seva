import prisma from '../config/prisma.js';

import PDFDocument from 'pdfkit';

import qr from 'qr-image';

import path from 'path';

export const generateDonationReceipt =
  async (req, res) => {

    try {

      const donation =
        await prisma.donation.findUnique({

          where: {
            id: parseInt(req.params.id)
          },

          include: {
            user: true
          }

        });

      if (!donation) {

        return res.status(404).json({

          success: false,

          message: 'Donation not found'

        });

      }

      const doc =
        new PDFDocument({

          size: 'A4',
          margin: 0

        });

      res.setHeader(
        'Content-Type',
        'application/pdf'
      );

      res.setHeader(
        'Content-Disposition',
        `inline; filename=receipt-${donation.id}.pdf`
      );

      doc.pipe(res);

      // 😄 BACKGROUND TEMPLATE

      const templatePath = path.join(
        process.cwd(),
        'assets',
        'receipt-template.jpg'
      );

      doc.image(
        templatePath,
        0,
        0,
        {
          width: 595,
          height: 842
        }
      );

      // 😄 TITLE

      doc
        .fontSize(26)
        .fillColor('#f97316')
        .text(
          'DONATION RECEIPT',
          150,
          180
        );

      // 😄 DONOR INFO

      doc
        .fontSize(16)
        .fillColor('black');

      doc.text(
        `Receipt No: DON-${donation.id}`,
        80,
        260
      );

      doc.text(
        `Donor Name: ${donation.user.name}`,
        80,
        300
      );

      doc.text(
        `Mobile: ${donation.user.mobile_number}`,
        80,
        340
      );

      doc
  .font('Helvetica-Bold')
  .fontSize(20)
  .fillColor('#16a34a')
  .text(
    `Amount:  ${donation.amount}`,
    80,
    380
  );
  doc
  .font('Helvetica')
  .fontSize(16)
  .fillColor('black');

      doc.text(
        `Payment Mode: ${donation.paymentMode}`,
        80,
        420
      );

      doc.text(
        `UTR Number: ${donation.utrNumber || 'N/A'}`,
        80,
        460
      );

      doc.text(
        `Date: ${new Date(
          donation.createdAt
        ).toLocaleString()}`,
        80,
        500
      );

      // 😄 VERIFIED STAMP

      if (
        donation.status === 'SUCCESS'
      ) {

        doc.save();

doc
  .fontSize(28)
  .fillColor('green')
  .rotate(-20, {
    origin: [450, 500]
  })
  .text(
    'VERIFIED',
    380,
    520
  );

doc.restore();

      }

      // 😄 QR

      const qrCode =
        qr.imageSync(

          `DONATION:${donation.id}|AMOUNT:${donation.amount}`,

          {
            type: 'png'
          }

        );

      doc.image(
        qrCode,
        420,
        260,
        {
          width: 120
        }
      );

      doc.end();

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message

      });

    }

  };
// import prisma from '../config/prisma.js';

// import PDFDocument from 'pdfkit';

// import QRCode from 'qrcode';

// export const downloadReceipt =
//   async (req, res) => {

//     try {

//       const donation =
//         await prisma.donation.findUnique({

//           where: {

//             id: parseInt(
//               req.params.id
//             )

//           },

//           include: {

//             user: true

//           }

//         });

//       if (!donation) {

//         return res.status(404).json({

//           success: false,

//           message:
//             'Donation not found'

//         });

//       }

//       const doc =
//         new PDFDocument();

//       res.setHeader(

//         'Content-Type',

//         'application/pdf'

//       );

//       res.setHeader(

//         'Content-Disposition',

//         `attachment; filename=receipt-${donation.id}.pdf`

//       );

//       doc.pipe(res);

//       doc
//         .fontSize(26)
//         .text(
//           'Shiv Shakti Seva Foundation',
//           {
//             align: 'center'
//           }
//         );

//       doc.moveDown();

//       doc
//         .fontSize(20)
//         .fillColor('green')
//         .text(
//           'DONATION RECEIPT',
//           {
//             align: 'center'
//           }
//         );

//       doc.moveDown(2);

//       doc
//         .fillColor('black')
//         .fontSize(14);

//       doc.text(
//         `Donor Name: ${donation.user.name}`
//       );

//       doc.text(
//         `Mobile: ${donation.user.mobile_number}`
//       );

//       doc.text(
//         `Amount: ₹${donation.amount}`
//       );

//       doc.text(
//         `Payment Mode: ${donation.paymentMode}`
//       );

//       doc.text(
//         `UTR: ${
//           donation.utrNumber || 'N/A'
//         }`
//       );

//       doc.text(
//         `Date: ${new Date(
//           donation.createdAt
//         ).toLocaleString()}`
//       );

//       doc.moveDown();

//       doc
//         .fillColor('green')
//         .fontSize(18)
//         .text(
//           'VERIFIED SUCCESSFULLY'
//         );

//       const qr =
//         await QRCode.toDataURL(

//           `Donation Receipt ${donation.id}`

//         );

//       const base64 =
//         qr.replace(
//           /^data:image\/png;base64,/,
//           ''
//         );

//       const qrBuffer =
//         Buffer.from(
//           base64,
//           'base64'
//         );

//       doc.image(qrBuffer, {

//         fit: [120, 120],

//         align: 'center'

//       });

//       doc.end();

//     } catch (error) {

//       res.status(500).json({

//         success: false,

//         message: error.message

//       });

//     }

//   };