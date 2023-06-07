function generateRandomHR() {
  const min = 50;
  const max = 195;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.generateRandomHR = generateRandomHR;
