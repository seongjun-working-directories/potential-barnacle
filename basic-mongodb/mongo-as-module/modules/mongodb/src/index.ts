import 'bson';
import type { MongoClientOptions } from 'mongodb';
import { MongoClient } from 'mongodb';

// [TSType]
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

export const getClient = (uri: string, option?: MongoClientOptions) => {
  const client = new MongoClient(uri, option);
  return client;
};

export type MongoClientType = ReturnType<typeof getClient>;

export * as MongodbTypes from './types';
export * as Document from './document';
export { DaoBase } from './modules/document.base';
