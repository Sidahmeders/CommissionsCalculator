export function calcCashIn(amount, CommissionFeeConfig) {
  const { cashInFeePercentage } = CommissionFeeConfig;
  const commissionFee = (amount * cashInFeePercentage) / 100;

  return commissionFee < 5 ? commissionFee : 5;
}

export function calcCashOutJuridical(amount, CommissionFeeConfig) {
  const { cashOutJuridicalFeePercentage } = CommissionFeeConfig;
  const commissionFee = (amount * cashOutJuridicalFeePercentage) / 100;

  return commissionFee > 0.5 ? commissionFee : 0.5;
}

export async function calcCashOutNatural(commission, CommissionFeeConfig, redisDB) {
  const { userId, amount, date } = commission;
  const { cashOutNaturalFeePercentage, freeCashOutLimitPerWeek } = CommissionFeeConfig;

  const userWeeklyTransactions = await redisDB.getUserWeeklyTransactions(userId, date);
  const userWeeklyCashOut = userWeeklyTransactions.reduce((prev, curr) => prev + curr.amount, 0);
  const freeCashOutLeft = freeCashOutLimitPerWeek - userWeeklyCashOut;
  const isCashOutLimitReached = amount - freeCashOutLeft > 0;

  let commissionFee;

  if (isCashOutLimitReached && freeCashOutLeft < 0) {
    commissionFee = (amount * cashOutNaturalFeePercentage) / 100;
  } else if (isCashOutLimitReached) {
    commissionFee = ((amount - freeCashOutLimitPerWeek) * cashOutNaturalFeePercentage) / 100;
  } else commissionFee = 0;

  await redisDB.addUserTransaction(userId, { date, amount });

  return commissionFee;
}

// export const roundNumber = (n) => Math.round(n * 1e3) / 1e3;

export default function makeCalculateCommission({
  CommissionFeeConfig,
  CommissionTypes,
  CommissionDto,
  redisDB,
}) {
  return async function calculateCommission(commission) {
    if (!(commission instanceof CommissionDto)) {
      throw new Error('"commission" is not instanceOf CommissionDto');
    }
    const { commissionType, amount } = commission;

    let commissionFee;

    if (
      // eslint-disable-next-line operator-linebreak
      commissionType === CommissionTypes.CASH_IN_NATURAL ||
      commissionType === CommissionTypes.CASH_IN_JURIDICAL
    ) {
      commissionFee = calcCashIn(amount, CommissionFeeConfig);
    } else if (commissionType === CommissionTypes.CASH_OUT_NATURAL) {
      commissionFee = await calcCashOutNatural(commission, CommissionFeeConfig, redisDB);
    } else if (commissionType === CommissionTypes.CASH_OUT_JURIDICAL) {
      commissionFee = calcCashOutJuridical(amount, CommissionFeeConfig);
    }

    return commissionFee.toFixed(2);
  };
}
