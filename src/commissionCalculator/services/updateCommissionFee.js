import { CommissionFeeConfig } from '../config';

export default function makeUpdateCommissionFee({ updatePayServiceFee, CommissionFeeDto }) {
  return async function updateCommissionFee() {
    const newCommissionFee = await updatePayServiceFee();

    CommissionFeeConfig.cashInFeePercentage = newCommissionFee.cashIn.percents;
    CommissionFeeConfig.cashOutJuridicalFeePercentage = newCommissionFee.cashOutJuridical.percents;
    CommissionFeeConfig.cashOutNaturalFeePercentage = newCommissionFee.cashOutNatural.percents;
    CommissionFeeConfig.freeCashOutLimitPerWeek = newCommissionFee.cashOutNatural.week_limit.amount;

    const CommissionFeeInstance = new CommissionFeeDto(CommissionFeeConfig);

    return CommissionFeeInstance;
  };
}
