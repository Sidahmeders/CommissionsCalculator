import { getDateDifferenceInDays } from '../../utils';

class RedisDB {
  constructor() {
    if (RedisDB.instance === undefined) {
      this.usersTransactions = {};
      RedisDB.instance = this;
    }
    // eslint-disable-next-line no-constructor-return
    return RedisDB.instance;
  }

  addUserTransaction(userId, transaction) {
    const userTransactions = this.usersTransactions[userId];
    if (userTransactions) userTransactions.push(transaction);
    else this.usersTransactions[userId] = [transaction];

    return Promise.resolve(this.usersTransactions[userId]);
  }

  getUserWeeklyTransactions(userId, commissionDate) {
    const weeklyTransactions = [];
    const userTransactions = [...this.#getUserTransaction(userId)];
    if (!userTransactions) return Promise.resolve(null);

    while (userTransactions.length) {
      const currentTransaction = userTransactions.pop();
      const daysDifference = getDateDifferenceInDays(commissionDate, currentTransaction?.date);
      if (daysDifference > 7) break;
      weeklyTransactions.push(currentTransaction);
    }

    return Promise.resolve(weeklyTransactions);
  }

  #getUserTransaction(userId) {
    const userTransactions = this.usersTransactions[userId];
    if (!userTransactions) return [];
    return userTransactions;
  }
}

const redisDbInstance = new RedisDB();
export default Object.freeze(redisDbInstance);
