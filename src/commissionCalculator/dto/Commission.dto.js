import { CommissionTypes } from '../config';

// eslint-disable-next-line import/prefer-default-export
export class CommissionDto {
  #userId;

  #commissionType;

  #date;

  #amount;

  constructor(userId, commissionType, date, amount) {
    if (!userId) throw new Error('"userId" is required!');
    if (!date) throw new Error('"date" is required!');
    if (!amount) throw new Error('"amount" is required!');
    if (!commissionType) throw new Error('"commissionType" is required!');
    if (!Object.values(CommissionTypes).includes(commissionType)) {
      throw new Error('"commissionType" should be an Enum of CommissionTypes!');
    }

    this.#userId = userId;
    this.#commissionType = commissionType;
    this.#date = date;
    this.#amount = amount;
  }

  get userId() {
    return this.#userId;
  }

  get commissionType() {
    return this.#commissionType;
  }

  get date() {
    return this.#date;
  }

  get amount() {
    return this.#amount;
  }
}
