import { PayServiceFee } from '../config';

export default function makeUpdatePayServiceFee({ Fetch }) {
  return async function updatePayServiceFee() {
    const currentMonth = new Date().getMonth();

    // get the updated commission fee each month
    if (PayServiceFee.monthOfUpdate !== currentMonth) {
      const cashIn = JSON.parse(await Fetch.Get({ path: '/cash-in' }));
      const cashOutNatural = JSON.parse(await Fetch.Get({ path: '/cash-out-natural' }));
      const cashOutJuridical = JSON.parse(await Fetch.Get({ path: '/cash-out-juridical' }));

      PayServiceFee.monthOfUpdate = currentMonth;
      PayServiceFee.cashIn = cashIn;
      PayServiceFee.cashOutNatural = cashOutNatural;
      PayServiceFee.cashOutJuridical = cashOutJuridical;
    }

    return PayServiceFee;
  };
}
