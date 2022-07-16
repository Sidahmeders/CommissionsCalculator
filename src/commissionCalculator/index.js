import { CommissionFeeConfig, CommissionTypes } from './config';
import { CommissionDto, CommissionFeeDto } from './dto';
import Fetch from './infrastructure/fetch';
import redisDB from './infrastructure/redisDB';

import makeUpdatePayServiceFee from './services/updatePayServiceFee';
import makeUpdateCommissionFee from './services/updateCommissionFee';
import makeCalculateCommission from './services/calculateCommission';
import makeExtractCommissionDto from './services/extractCommissionDto';

const updatePayServiceFee = makeUpdatePayServiceFee({ Fetch });
const updateCommissionFee = makeUpdateCommissionFee({ updatePayServiceFee, CommissionFeeDto });

const extractCommissionDto = makeExtractCommissionDto({ CommissionDto });
const calculateCommission = makeCalculateCommission({
  CommissionFeeConfig,
  CommissionTypes,
  CommissionDto,
  redisDB,
});

// eslint-disable-next-line object-curly-newline
export { calculateCommission, extractCommissionDto, updatePayServiceFee, updateCommissionFee };
