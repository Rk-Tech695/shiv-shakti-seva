const generatePNR = () => {

  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `SSSF${random}`;

};

export default generatePNR;