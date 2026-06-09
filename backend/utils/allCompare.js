import bcrypt from 'bcrypt';
import logger from './logger.js';

const compareOtp = async (enteredOtp, hashedOtp) => {
    logger.info("Comparison of the Otp");

  const res =  await bcrypt.compare(enteredOtp, hashedOtp);
  logger.info(res ? "Success in Comparing " :"Failure in Comparing");
  return res;
};

export {compareOtp};


