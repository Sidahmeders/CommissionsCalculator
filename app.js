import main from './src/main';

const result = await main();

result.forEach((commissionFee) => {
  // eslint-disable-next-line no-console
  console.log(commissionFee);
});
