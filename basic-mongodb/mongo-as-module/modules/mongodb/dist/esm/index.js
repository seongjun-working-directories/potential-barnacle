import 'bson';
import { MongoClient } from 'mongodb';
export const getClient = (uri, option) => {
    const client = new MongoClient(uri, option);
    return client;
};
export * as MongodbTypes from './types';
export * as Document from './document';
export { DaoBase } from './modules/document.base';
//# sourceMappingURL=index.js.map