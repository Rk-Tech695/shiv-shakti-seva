// import prisma from '../config/prisma.js';

// export const adminLogin = async (req, res) => {

//   try {

//     console.log("BODY =>", req.body);

//     const username = req.body.username;
//     const password = req.body.password;

//     const admin = await prisma.admin.findFirst({
//       where: {
//         username
//       }
//     });

//     console.log("ADMIN =>", admin);

//     if (!admin) {

//       return res.status(404).json({
//         success: false,
//         message: 'Admin not found'
//       });

//     }

//     if (admin.password !== password) {

//       return res.status(401).json({
//         success: false,
//         message: 'Wrong password'
//       });

//     }

//     return res.json({
//       success: true,
//       message: 'Login successful'
//     });

//   } catch (error) {

//     console.log("FULL ERROR =>");
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// };

import prisma from '../config/prisma.js';

import bcrypt from 'bcryptjs';

export const adminLogin =
  async (req, res) => {

    try {

      console.log(
        "BODY =>",
        req.body
      );

      const username =
        req.body.username;

      const password =
        req.body.password;

      const admin =
        await prisma.admin.findFirst({

          where: {

            username

          }

        });

      console.log(
        "ADMIN =>",
        admin
      );

      if (!admin) {

        return res.status(404).json({

          success: false,

          message:
            'Admin not found'

        });

      }

      const isMatch =
        await bcrypt.compare(

          password,

          admin.password

        );

      if (!isMatch) {

        return res.status(401).json({

          success: false,

          message:
            'Wrong password'

        });

      }

      return res.json({

        success: true,

        message:
          'Login successful'

      });

    } catch (error) {

      console.log(
        "FULL ERROR =>"
      );

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          error.message

      });

    }

  };