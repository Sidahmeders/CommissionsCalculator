// eslint-disable-next-line import/prefer-default-export
export class CommissionFeeDto {
  #cashInFeePercentage;

  #cashOutJuridicalFeePercentage;

  #cashOutNaturalFeePercentage;

  #freeCashOutLimitPerWeek;

  constructor({
    cashInFeePercentage,
    cashOutJuridicalFeePercentage,
    cashOutNaturalFeePercentage,
    freeCashOutLimitPerWeek,
  }) {
    if (!cashInFeePercentage) {
      throw new Error('"cashInFeePercentage" field is required!');
    }
    if (!cashOutJuridicalFeePercentage) {
      throw new Error('"cashOutJuridicalFeePercentage" field is required!');
    }
    if (!cashOutNaturalFeePercentage) {
      throw new Error('"cashOutNaturalFeePercentage" field is required!');
    }
    if (!freeCashOutLimitPerWeek) {
      throw new Error('"freeCashOutLimitPerWeek" field is required!');
    }

    this.#cashInFeePercentage = cashInFeePercentage;
    this.#cashOutJuridicalFeePercentage = cashOutJuridicalFeePercentage;
    this.#cashOutNaturalFeePercentage = cashOutNaturalFeePercentage;
    this.#freeCashOutLimitPerWeek = freeCashOutLimitPerWeek;
  }

  get cashInFeePercentage() {
    return this.#cashInFeePercentage;
  }

  get cashOutJuridicalFeePercentage() {
    return this.#cashOutJuridicalFeePercentage;
  }

  get cashOutNaturalFeePercentage() {
    return this.#cashOutNaturalFeePercentage;
  }

  get freeCashOutLimitPerWeek() {
    return this.#freeCashOutLimitPerWeek;
  }
}
