import type { UserInfo } from '../modules/document.base';
import type { TSchema } from '../types/index';
import { ObjectId, type MongoClient } from 'mongodb';
export interface FundReportDocument {
    fundId: ObjectId;
    investeeReportId: ObjectId;
    targetInvesteeIds: ObjectId[];
    confirmList: {
        _id: ObjectId;
        fileId: ObjectId;
        member: UserInfo;
        dateTime: Date;
        memo: string;
    }[];
}
export interface FundReportDocumentWithDefault extends TSchema<NowDocument> {
}
export declare const collectionName = "investmentFundReport";
declare type NowDocument = FundReportDocument;
export declare function daoFactory(client: MongoClient): {
    new (user: UserInfo): {
        getManyItemsInInvesteeReportIds: (reportIds: ObjectId[]) => Promise<import("mongodb").WithId<TSchema<FundReportDocument>>[]>;
        getManyItemsInInvesteeReportIdsAndFundIds: (investeeReportIds: ObjectId[], fundIds: ObjectId[]) => Promise<import("mongodb").WithId<TSchema<FundReportDocument>>[]>;
        getItemsCountByInvesteeReportIds: (reportIds: ObjectId[]) => Promise<number>;
        updateNewConfirm: (_id: ObjectId, fileId: ObjectId, memo: string) => Promise<import("mongodb").UpdateResult>;
        updateConfirmMemo: (_id: ObjectId, confirmId: ObjectId, memo: string) => Promise<import("mongodb").UpdateResult>;
        _fixedDatabase: string | null;
        _isKeepInstance: boolean;
        _isLinkedInstance: boolean;
        _linkInstance: any;
        _db: import("mongodb").Db | null;
        _collection: import("mongodb").Collection<TSchema<FundReportDocument>> | null;
        _client: MongoClient;
        _collectionName: string;
        _userInfo: UserInfo;
        _uniqueIndexTarget: string[][];
        dateQueryUtil: {
            getCurrentDate: (inputDate: string) => Date;
            fromDate: (date: string) => Date;
            toDate: (date: string) => Date;
            getFromToQuery: (date: string[] | [string, string]) => {
                $gte: Date;
                $lte: Date;
            };
            getDayToQuery: (date: string) => {
                $gte: Date;
                $lte: Date;
            };
        };
        fix: (database: string) => void;
        _link: (db: import("mongodb").Db) => Promise<void>;
        _unLink: () => Promise<void>;
        _getDb: () => Promise<import("mongodb").Db>;
        _close: () => Promise<void>;
        start: (instanceList?: any[] | undefined) => Promise<void>;
        end: () => Promise<void>;
        _setUniqueIndex: (collection: import("mongodb").Collection<TSchema<FundReportDocument>>) => void;
        setUniqueIndexTarget: (...arg: (keyof FundReportDocument)[]) => void;
        _getCollection: () => Promise<import("mongodb").Collection<TSchema<FundReportDocument>>>;
        _findOne: (filter: import("mongodb").Filter<TSchema<FundReportDocument>>, options?: import("mongodb").FindOptions<TSchema<FundReportDocument>> | undefined) => Promise<TSchema<FundReportDocument> | null>;
        _find: (filter: import("mongodb").Filter<TSchema<FundReportDocument>>, options?: import("mongodb").FindOptions<TSchema<FundReportDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<FundReportDocument>>[]>;
        _countDocument: (filter?: import("mongodb").Filter<TSchema<FundReportDocument>>, options?: import("mongodb").CountDocumentsOptions | undefined) => Promise<number>;
        _insertOne: (doc: TSchema<FundReportDocument>, options?: import("mongodb").InsertOneOptions) => Promise<import("mongodb").InsertOneResult<TSchema<FundReportDocument>>>;
        _insertMany: (docs: TSchema<FundReportDocument>[], options?: import("mongodb").BulkWriteOptions) => Promise<import("mongodb").InsertManyResult<TSchema<FundReportDocument>>>;
        _updateOne: (filter: import("mongodb").Filter<TSchema<FundReportDocument>>, update: Partial<TSchema<FundReportDocument>> | import("mongodb").UpdateFilter<TSchema<FundReportDocument>>, options?: import("mongodb").UpdateOptions) => Promise<import("mongodb").UpdateResult>;
        _updateMany: (filter: import("mongodb").Filter<TSchema<FundReportDocument>>, update: Partial<TSchema<FundReportDocument>> | import("mongodb").UpdateFilter<TSchema<FundReportDocument>>, options?: import("mongodb").UpdateOptions) => Promise<import("bson").Document | import("mongodb").UpdateResult>;
        _deleteOne: (filter: import("mongodb").Filter<TSchema<FundReportDocument>>, options?: import("mongodb").DeleteOptions) => Promise<import("mongodb").DeleteResult>;
        _deleteMany: (filter: import("mongodb").Filter<TSchema<FundReportDocument>>, options?: import("mongodb").DeleteOptions) => Promise<import("mongodb").DeleteResult>;
        _getCreateInfoDocument: (docList: FundReportDocument[]) => TSchema<FundReportDocument>[];
        _getUpdateInfoDocument: (docList: (Partial<FundReportDocument & import("../types/index").DefaultFields> & {
            _id: string | ObjectId;
        })[]) => ({
            u_user: string;
            u_date: Date;
        } & Partial<FundReportDocument & import("../types/index").DefaultFields> & {
            _id: string | ObjectId;
        })[];
        _getObjectId: (id: string | ObjectId) => ObjectId;
        _getObjectIdList: (idList: (string | ObjectId)[]) => ObjectId[];
        getItemList: (options?: import("mongodb").FindOptions<TSchema<FundReportDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<FundReportDocument>>[]>;
        getOneItemById: (id: string | ObjectId, options?: import("mongodb").FindOptions<TSchema<FundReportDocument>> | undefined) => Promise<TSchema<FundReportDocument> | null>;
        getManyItemById: (idList: (string | ObjectId)[], options?: import("mongodb").FindOptions<TSchema<FundReportDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<FundReportDocument>>[]>;
        insertOneItem: (insertItem: FundReportDocument, options?: import("mongodb").InsertOneOptions) => Promise<import("mongodb").InsertOneResult<TSchema<FundReportDocument>>>;
        insertManyItem: (insertItemList: FundReportDocument[], options?: import("mongodb").BulkWriteOptions) => Promise<import("mongodb").InsertManyResult<TSchema<FundReportDocument>>>;
        updateOneItem: (updateItem: Partial<FundReportDocument & import("../types/index").DefaultFields> & {
            _id: string | ObjectId;
        }, options?: import("mongodb").UpdateOptions | undefined) => Promise<void>;
        updateManyItem: (updateItemList: (Partial<FundReportDocument & import("../types/index").DefaultFields> & {
            _id: string | ObjectId;
        })[], options?: import("mongodb").UpdateOptions | undefined) => Promise<void>;
        deleteOneItemById: (id: string | ObjectId, options?: import("mongodb").DeleteOptions | undefined) => Promise<import("mongodb").DeleteResult>;
        deleteManyItemById: (idList: (string | ObjectId)[], options?: import("mongodb").DeleteOptions | undefined) => Promise<import("mongodb").DeleteResult>;
    };
};
export {};
//# sourceMappingURL=investment.fund.report.d.ts.map