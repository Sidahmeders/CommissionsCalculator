import { CommissionFeeConfig } from '../config';
import { updateCommissionFee } from '../index';
import redisDB from '../infrastructure/redisDB';
import { calcCashIn, calcCashOutJuridical, calcCashOutNatural } from './calculateCommission';

// WARNING: this method is required to update the undefined CommissionFeeConfig values
// or otherwise the result will be unexpected.
await updateCommissionFee();

/* eslint-disable no-undef */

describe('calculateCommission service', () => {
  it('should calculate cashIn commission fee from total amount, but no more than [X-amount]-EUR', () => {
    const result1 = calcCashIn(100, CommissionFeeConfig);
    const result2 = calcCashIn(15000, CommissionFeeConfig);
    const result3 = calcCashIn(450000, CommissionFeeConfig);

    expect(result1).toBe(0.03);
    expect(result2).toBe(4.5);
    expect(result3).toBe(5);
  });

  it(`should calculate cashOut for "Legal Persons" commission fee - [X-amount]% from cash out amount
      but not less than [X-amount] for operation `, () => {
    const result1 = calcCashOutJuridical(150, CommissionFeeConfig);
    const result2 = calcCashOutJuridical(1500, CommissionFeeConfig);
    const result3 = calcCashOutJuridical(1, CommissionFeeConfig);

    expect(result1).toBe(0.5);
    expect(result2).toBe(4.5);
    expect(result3).toBe(0.5);
  });

  it(`should calculate cashOut for "Natural Persons" commission fee - [X-amount]% from cash out amount
      after exceeding the weekly [X-amount] free of charge`, async () => {
    const commission1 = { userId: 1, amount: 2500, date: '2016-01-05' };
    const commission2 = { userId: 1, amount: 1500, date: '2016-01-09' };
    const result1 = await calcCashOutNatural(commission1, CommissionFeeConfig, redisDB);
    const result2 = await calcCashOutNatural(commission2, CommissionFeeConfig, redisDB);

    const commission3 = { userId: 2, amount: 1500, date: '2016-01-05' };
    const commission4 = { userId: 2, amount: 2500, date: '2016-01-09' };
    const result3 = await calcCashOutNatural(commission3, CommissionFeeConfig, redisDB);
    const result4 = await calcCashOutNatural(commission4, CommissionFeeConfig, redisDB);

    expect(result1).toBe(4.5);
    expect(result2).toBe(4.5);

    expect(result3).toBe(1.5);
    expect(result4).toBe(7.5);
  });
});
