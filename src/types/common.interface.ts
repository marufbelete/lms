import { IncludeOptions, Transaction } from 'sequelize';

export interface IncludeOptionsWithTransaction extends IncludeOptions {
  transaction?: Transaction;
}