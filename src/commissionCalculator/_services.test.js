import { CommissionDto, CommissionFeeDto } from './dto';
import {
  extractCommissionDto,
  updatePayServiceFee,
  updateCommissionFee,
  calculateCommission,
} from '.';

/* eslint-disable no-undef */

describe('Commission Calculator services', () => {
  const commission = {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  };

  const commission2 = {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200, currency: 'EUR' },
  };

  it('should extract commission Object and return a new CommissionDto instance', () => {
    const commissionDto = extractCommissionDto(commission);

    expect(commissionDto instanceof CommissionDto).toBe(true);
  });

  it('should get and update the pay-service-fee each month if there was any updates', async () => {
    const updatedCommissionFee = await updatePayServiceFee();
    const currentMonth = new Date().getMonth();

    expect(updatedCommissionFee.monthOfUpdate).toBe(currentMonth);
  }, 10000);

  it('should update the commission fee', async () => {
    const commissionFeeConfig = await updateCommissionFee();

    expect(commissionFeeConfig instanceof CommissionFeeDto).toBe(true);
  });

  it('should calculate the commission fee,', async () => {
    const [commissionDto, commissionDto2] = [
      extractCommissionDto(commission),
      extractCommissionDto(commission2),
    ];
    const [result, result2] = [
      await calculateCommission(commissionDto),
      await calculateCommission(commissionDto2),
    ];

    expect(result).toBe('0.90');
    expect(result2).toBe('0.06');
  });
});
