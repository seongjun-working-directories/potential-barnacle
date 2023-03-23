import type { Document, Filter, FindOptions, OptionalUnlessRequiredId, UpdateFilter, UpdateOptions, BulkWriteOptions, InsertOneOptions, DeleteOptions, CountDocumentsOptions } from 'mongodb';
import type { DefaultFields, TSchema } from '../types/index';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
declare type UserPath = 'pc' | 'mobile' | 'app';
export declare type UserInfo = {
    id: string;
    path: UserPath;
    isInit: boolean;
    role: string;
    company: string;
    mongoKey: string;
    sqlKey: string;
    redisKey: number;
};
export declare const error: (msg: string, originError?: any) => Error;
declare type UpdateDocument<T> = Partial<T & DefaultFields> & {
    _id: string | ObjectId;
};
export declare class DaoBase<D extends Document = Document> {
    _fixedDatabase: string | null;
    _isKeepInstance: boolean;
    _isLinkedInstance: boolean;
    _linkInstance: any | null;
    _db: Db | null;
    _collection: Collection<TSchema<D>> | null;
    _client: MongoClient;
    _collectionName: string;
    _userInfo: UserInfo;
    _uniqueIndexTarget: string[][];
    dateQueryUtil: {
        getCurrentDate: (inputDate: string) => Date;
        fromDate: (date: string) => Date;
        toDate: (date: string) => Date;
        getFromToQuery: (date: [string, string] | string[]) => {
            $gte: Date;
            $lte: Date;
        };
        getDayToQuery: (date: string) => {
            $gte: Date;
            $lte: Date;
        };
    };
    constructor(client: MongoClient, userInfo: UserInfo, collectionName: string);
    fix: (database: string) => void;
    _link: (db: Db) => Promise<void>;
    _unLink: () => Promise<void>;
    _getDb: () => Promise<Db>;
    _close: () => Promise<void>;
    start: (instanceList?: any[]) => Promise<void>;
    end: () => Promise<void>;
    _setUniqueIndex: (collection: Collection<TSchema<D>>) => void;
    setUniqueIndexTarget: (...arg: (keyof D)[]) => void;
    _getCollection: () => Promise<Collection<TSchema<D>>>;
    _findOne: (filter: Filter<TSchema<D>>, options?: FindOptions<TSchema<D>>) => Promise<TSchema<D> | null>;
    _find: (filter: Filter<TSchema<D>>, options?: FindOptions<TSchema<D>>) => Promise<import("mongodb").WithId<TSchema<D>>[]>;
    _countDocument: (filter?: Filter<TSchema<D>>, options?: CountDocumentsOptions) => Promise<number>;
    _insertOne: (doc: OptionalUnlessRequiredId<TSchema<D>>, options?: InsertOneOptions) => Promise<import("mongodb").InsertOneResult<TSchema<D>>>;
    _insertMany: (docs: OptionalUnlessRequiredId<TSchema<D>>[], options?: BulkWriteOptions) => Promise<import("mongodb").InsertManyResult<TSchema<D>>>;
    _updateOne: (filter: Filter<TSchema<D>>, update: Partial<TSchema<D>> | UpdateFilter<TSchema<D>>, options?: UpdateOptions) => Promise<import("mongodb").UpdateResult>;
    _updateMany: (filter: Filter<TSchema<D>>, update: Partial<TSchema<D>> | UpdateFilter<TSchema<D>>, options?: UpdateOptions) => Promise<Document | import("mongodb").UpdateResult>;
    _deleteOne: (filter: Filter<TSchema<D>>, options?: DeleteOptions) => Promise<import("mongodb").DeleteResult>;
    _deleteMany: (filter: Filter<TSchema<D>>, options?: DeleteOptions) => Promise<import("mongodb").DeleteResult>;
    _getCreateInfoDocument: (docList: D[]) => OptionalUnlessRequiredId<TSchema<D>>[];
    _getUpdateInfoDocument: (docList: UpdateDocument<D>[]) => ({
        u_user: string;
        u_date: Date;
    } & Partial<D & DefaultFields> & {
        _id: string | ObjectId;
    })[];
    _getObjectId: (id: string | ObjectId) => ObjectId;
    _getObjectIdList: (idList: (string | ObjectId)[]) => ObjectId[];
    getItemList: (options?: FindOptions<TSchema<D>>) => Promise<import("mongodb").WithId<TSchema<D>>[]>;
    getOneItemById: (id: string | ObjectId, options?: FindOptions<TSchema<D>>) => Promise<TSchema<D> | null>;
    getManyItemById: (idList: (string | ObjectId)[], options?: FindOptions<TSchema<D>>) => Promise<import("mongodb").WithId<TSchema<D>>[]>;
    insertOneItem: (insertItem: D, options?: InsertOneOptions) => Promise<import("mongodb").InsertOneResult<TSchema<D>>>;
    insertManyItem: (insertItemList: D[], options?: BulkWriteOptions) => Promise<import("mongodb").InsertManyResult<TSchema<D>>>;
    updateOneItem: (updateItem: UpdateDocument<D>, options?: UpdateOptions) => Promise<void>;
    updateManyItem: (updateItemList: UpdateDocument<D>[], options?: UpdateOptions) => Promise<void>;
    deleteOneItemById: (id: string | ObjectId, options?: DeleteOptions) => Promise<import("mongodb").DeleteResult>;
    deleteManyItemById: (idList: (string | ObjectId)[], options?: DeleteOptions) => Promise<import("mongodb").DeleteResult>;
}
export declare function getCurrentDate(inputDate?: string | Date): Date;
export declare const fromDate: (date: string) => Date;
export declare const toDate: (date: string) => Date;
export declare const getFromToQuery: (date: [string, string] | string[]) => void;
export {};
//# sourceMappingURL=document.base.d.ts.map