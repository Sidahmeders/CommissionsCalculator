import { readCommissionsArray } from './utils';
import {
  calculateCommission,
  updateCommissionFee,
  extractCommissionDto,
} from './commissionCalculator';

async function main(filePath) {
  try {
    await updateCommissionFee();
    const commissionsArray = await readCommissionsArray(filePath);
    const result = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const commission of commissionsArray) {
      // WRANING: I used a regular for loop because higher-order functions
      // (Array.forEach & Array.map) don't work as expected.
      const commissionInstance = extractCommissionDto(commission);
      // eslint-disable-next-line no-await-in-loop
      const commissionFee = await calculateCommission(commissionInstance);
      result.push(commissionFee);
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default main;
