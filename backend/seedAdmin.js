import prisma from './src/config/prisma.js';

import bcrypt from 'bcryptjs';

const createAdmin =
  async () => {

    try {

      const hashedPassword =
        await bcrypt.hash(
          '',
          10
        );

      const admin =
        await prisma.admin.create({

          data: {

            username: '',

            password:
              hashedPassword

          }

        });

      console.log(
        'ADMIN CREATED =>',
        admin
      );

    } catch (error) {

      console.log(error);

    }

  };

createAdmin();