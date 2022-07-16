import main from '../src/main';

/* eslint-disable no-undef */

describe('App should run', () => {
  it('should calculate the commissions fee', async () => {
    const expectedArray = ['0.06', '0.90', '87.00', '3.00', '0.30', '0.30', '5.00', '0.00', '0.00'];
    const resultArray = await main('input.json');

    expect(resultArray).toStrictEqual(expectedArray);
  });
});
