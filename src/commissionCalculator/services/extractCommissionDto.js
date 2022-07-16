export default function makeExtractCommissionDto({ CommissionDto }) {
  return function extractCommissionDto(commission) {
    const { date, type, operation } = commission;
    const [userId, userType, amount] = [commission.user_id, commission.user_type, operation.amount];
    const commissionType = `${type}_${userType}`;

    return new CommissionDto(userId, commissionType, date, amount);
  };
}
