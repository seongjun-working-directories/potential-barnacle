import 'bson';
import type { MongoClientOptions } from 'mongodb';
import { MongoClient } from 'mongodb';
declare type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
export declare const getClient: (uri: string, option?: MongoClientOptions) => MongoClient;
export declare type MongoClientType = ReturnType<typeof getClient>;
export * as MongodbTypes from './types';
export * as Document from './document';
export { DaoBase } from './modules/document.base';
//# sourceMappingURL=index.d.ts.map