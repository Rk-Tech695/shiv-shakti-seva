import cron from 'node-cron';

import prisma from '../config/prisma.js';

cron.schedule('0 0 * * *', async () => {

  const today = new Date();

  const users = await prisma.user.findMany({
    where: {
      dob: {
        not: null
      }
    }
  });

  const birthdayUsers = users.filter(user => {

    const dob = new Date(user.dob);

    return (
      dob.getDate() === today.getDate() &&
      dob.getMonth() === today.getMonth()
    );

  });

  birthdayUsers.forEach(user => {

    console.log(`Happy Birthday ${user.name}`);

  });

});