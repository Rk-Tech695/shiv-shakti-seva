import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import path from 'path';

const generateTicketPdf = async booking => {

  return new Promise(async (resolve, reject) => {

    try {

      const doc = new PDFDocument({
        margin: 0,
        size: 'A4'
      });

      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));

      doc.on('end', () => {

        const pdfData = Buffer.concat(buffers);

        resolve(pdfData);

      });

      // TEMPLATE IMAGE
      const templatePath = path.join(
        process.cwd(),
        'assets',
        'receipt-template.jpg'
      );

      // FULL PAGE BACKGROUND
      doc.image(
        templatePath,
        0,
        0,
        {
          width: 595,
          height: 842
        }
      );

      // TITLE
      // doc
      //   .fontSize(20)
      //   .fillColor('#ea580c')
      //   .text(
      //     'SHIV SHAKTI SEVA FOUNDATION',
      //     70,
      //     80,
      //     {
      //       align: 'center'
      //     }
      //   );

      // BOOKING DETAILS
      doc
        .fontSize(14)
        .fillColor('black');

      doc.text(`PNR: ${booking.pnr}`, 70, 180);

      doc.text(
        `Event: ${booking.event.title}`,
        70,
        210
      );

      doc.text(
        `Location: ${booking.event.location}`,
        70,
        240
      );

      doc.text(
        `Mobile: ${booking.mobileNumber}`,
        70,
        270
      );

      // DEVOTEES
      let y = 330;

      booking.devotees.forEach(
        (devotee, index) => {

          doc.text(
            `${index + 1}. ${devotee.name} | ${devotee.gender} | ${devotee.age}`,
            70,
            y
          );

          y += 25;

        }
      );

      // QR CODE
      const qrData =
        `PNR:${booking.pnr}
EVENT:${booking.event.title}
MOBILE:${booking.mobileNumber}`;

      const qrImage =
        await QRCode.toDataURL(qrData);

      const base64Data =
        qrImage.replace(
          /^data:image\/png;base64,/,
          ''
        );

      const qrBuffer =
        Buffer.from(base64Data, 'base64');

      doc.image(
        qrBuffer,
        400,
        600,
        {
          width: 120
        }
      );

      doc.end();

    } catch (error) {

      reject(error);

    }

  });

};

export default generateTicketPdf;

// import PDFDocument from 'pdfkit';

// import QRCode from 'qrcode';

// const generateTicketPdf =
//   async booking => {

//     return new Promise(
//       async (resolve, reject) => {

//         try {

//           const doc =
//             new PDFDocument({

//               margin: 40

//             });

//           const buffers = [];

//           doc.on(
//             'data',
//             buffers.push.bind(buffers)
//           );

//           doc.on('end', () => {

//             const pdfData =
//               Buffer.concat(buffers);

//             resolve(pdfData);

//           });

//           // TITLE

//           doc
//             .fontSize(24)
//             .fillColor('#ea580c')
//             .text(
//               'SHIV SHAKTI SEVA FOUNDATION',
//               {
//                 align: 'center'
//               }
//             );

//           doc.moveDown();

//           doc
//             .fontSize(18)
//             .fillColor('black')
//             .text(
//               'EVENT TICKET',
//               {
//                 align: 'center'
//               }
//             );

//           doc.moveDown(2);

//           // BOOKING DETAILS

//           doc
//             .fontSize(14)
//             .text(
//               `PNR: ${booking.pnr}`
//             );

//           doc.text(
//             `Event: ${booking.event.title}`
//           );

//           doc.text(
//             `Location: ${booking.event.location}`
//           );

//           doc.text(
//             `Mobile: ${booking.mobileNumber}`
//           );

//           doc.text(
//             `Total Persons: ${booking.totalPersons}`
//           );

//           doc.text(
//             `Status: ${booking.bookingStatus}`
//           );

//           doc.moveDown();

//           // DEVOTEES

//           doc
//             .fontSize(16)
//             .fillColor('#ea580c')
//             .text('Devotees');

//           doc.moveDown(0.5);

//           booking.devotees.forEach(
//             (devotee, index) => {

//               doc
//                 .fontSize(13)
//                 .fillColor('black')
//                 .text(

//                   `${index + 1}. ${devotee.name} | ${devotee.gender} | ${devotee.age}`

//                 );

//             }
//           );

//           doc.moveDown(2);

//           // QR CODE

//           const qrData =
//             `PNR:${booking.pnr}
//              EVENT:${booking.event.title}
//              MOBILE:${booking.mobileNumber}`;

//           const qrImage =
//             await QRCode.toDataURL(qrData);

//           const base64Data =
//             qrImage.replace(
//               /^data:image\/png;base64,/,
//               ''
//             );

//           const qrBuffer =
//             Buffer.from(
//               base64Data,
//               'base64'
//             );

//           doc.image(qrBuffer, {

//             fit: [150, 150],

//             align: 'center'

//           });

//           doc.moveDown(2);

//           doc
//             .fontSize(12)
//             .fillColor('green')
//             .text(
//               'Please carry this ticket during entry.',
//               {
//                 align: 'center'
//               }
//             );

//           doc.end();

//         } catch (error) {

//           reject(error);

//         }

//       }
//     );

//   };

// export default generateTicketPdf;