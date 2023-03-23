import type { UserInfo, InformationTypes } from '@mongomodule/types';
import type { MongoClient, Collection } from 'mongodb';
import type { TSchema } from '../types/index';
export interface InformationCompanyDocument {
    companyCode: string;
    name: string;
    ceo: string;
    uniqueNumber: number;
    businessNumber?: number;
    ksicCode: string;
    ksicName: string;
    establishmentDate: Date;
    numberOfEmployee: number;
    mainProducts: string;
    telephone: string;
    fax: string;
    address: string;
    authorizedShares: number;
    issuedShares: number;
    faceValue: number;
    isListed: boolean;
    stockMarket?: InformationTypes.StockMarket;
    listingDate?: Date;
    enterpriseSize: InformationTypes.EnterpriseSize;
    website: string;
    apiToken: string;
    updateDate: Date;
    isLatest: boolean;
}
export interface InformationCompanyDocumentWithDefault extends TSchema<NowDocument> {
}
export declare const collectionName = "informationCompany";
declare type NowDocument = InformationCompanyDocument;
export declare function daoFactory(client: MongoClient): {
    new (user: UserInfo): {
        getLatestInfo: () => Promise<TSchema<InformationCompanyDocument> | null>;
        getOneItemByCompanyCode: (code: string) => Promise<TSchema<InformationCompanyDocument> | null>;
        updateTotalDocumentLatestFalse: () => Promise<import("bson").Document | import("mongodb").UpdateResult>;
        _fixedDatabase: string | null;
        _isKeepInstance: boolean;
        _isLinkedInstance: boolean;
        _linkInstance: any;
        _db: import("mongodb").Db | null;
        _collection: Collection<TSchema<InformationCompanyDocument>> | null;
        _client: MongoClient;
        _collectionName: string;
        _userInfo: import("../modules/document.base").UserInfo;
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
        _setUniqueIndex: (collection: Collection<TSchema<InformationCompanyDocument>>) => void;
        setUniqueIndexTarget: (...arg: (keyof InformationCompanyDocument)[]) => void;
        _getCollection: () => Promise<Collection<TSchema<InformationCompanyDocument>>>;
        _findOne: (filter: import("mongodb").Filter<TSchema<InformationCompanyDocument>>, options?: import("mongodb").FindOptions<TSchema<InformationCompanyDocument>> | undefined) => Promise<TSchema<InformationCompanyDocument> | null>;
        _find: (filter: import("mongodb").Filter<TSchema<InformationCompanyDocument>>, options?: import("mongodb").FindOptions<TSchema<InformationCompanyDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<InformationCompanyDocument>>[]>;
        _countDocument: (filter?: import("mongodb").Filter<TSchema<InformationCompanyDocument>>, options?: import("mongodb").CountDocumentsOptions | undefined) => Promise<number>;
        _insertOne: (doc: TSchema<InformationCompanyDocument>, options?: import("mongodb").InsertOneOptions) => Promise<import("mongodb").InsertOneResult<TSchema<InformationCompanyDocument>>>;
        _insertMany: (docs: TSchema<InformationCompanyDocument>[], options?: import("mongodb").BulkWriteOptions) => Promise<import("mongodb").InsertManyResult<TSchema<InformationCompanyDocument>>>;
        _updateOne: (filter: import("mongodb").Filter<TSchema<InformationCompanyDocument>>, update: Partial<TSchema<InformationCompanyDocument>> | import("mongodb").UpdateFilter<TSchema<InformationCompanyDocument>>, options?: import("mongodb").UpdateOptions) => Promise<import("mongodb").UpdateResult>;
        _updateMany: (filter: import("mongodb").Filter<TSchema<InformationCompanyDocument>>, update: Partial<TSchema<InformationCompanyDocument>> | import("mongodb").UpdateFilter<TSchema<InformationCompanyDocument>>, options?: import("mongodb").UpdateOptions) => Promise<import("bson").Document | import("mongodb").UpdateResult>;
        _deleteOne: (filter: import("mongodb").Filter<TSchema<InformationCompanyDocument>>, options?: import("mongodb").DeleteOptions) => Promise<import("mongodb").DeleteResult>;
        _deleteMany: (filter: import("mongodb").Filter<TSchema<InformationCompanyDocument>>, options?: import("mongodb").DeleteOptions) => Promise<import("mongodb").DeleteResult>;
        _getCreateInfoDocument: (docList: InformationCompanyDocument[]) => TSchema<InformationCompanyDocument>[];
        _getUpdateInfoDocument: (docList: (Partial<InformationCompanyDocument & import("../types/index").DefaultFields> & {
            _id: string | import("bson").ObjectID;
        })[]) => ({
            u_user: string;
            u_date: Date;
        } & Partial<InformationCompanyDocument & import("../types/index").DefaultFields> & {
            _id: string | import("bson").ObjectID;
        })[];
        _getObjectId: (id: string | import("bson").ObjectID) => import("bson").ObjectID;
        _getObjectIdList: (idList: (string | import("bson").ObjectID)[]) => import("bson").ObjectID[];
        getItemList: (options?: import("mongodb").FindOptions<TSchema<InformationCompanyDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<InformationCompanyDocument>>[]>;
        getOneItemById: (id: string | import("bson").ObjectID, options?: import("mongodb").FindOptions<TSchema<InformationCompanyDocument>> | undefined) => Promise<TSchema<InformationCompanyDocument> | null>;
        getManyItemById: (idList: (string | import("bson").ObjectID)[], options?: import("mongodb").FindOptions<TSchema<InformationCompanyDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<InformationCompanyDocument>>[]>;
        insertOneItem: (insertItem: InformationCompanyDocument, options?: import("mongodb").InsertOneOptions) => Promise<import("mongodb").InsertOneResult<TSchema<InformationCompanyDocument>>>;
        insertManyItem: (insertItemList: InformationCompanyDocument[], options?: import("mongodb").BulkWriteOptions) => Promise<import("mongodb").InsertManyResult<TSchema<InformationCompanyDocument>>>;
        updateOneItem: (updateItem: Partial<InformationCompanyDocument & import("../types/index").DefaultFields> & {
            _id: string | import("bson").ObjectID;
        }, options?: import("mongodb").UpdateOptions | undefined) => Promise<void>;
        updateManyItem: (updateItemList: (Partial<InformationCompanyDocument & import("../types/index").DefaultFields> & {
            _id: string | import("bson").ObjectID;
        })[], options?: import("mongodb").UpdateOptions | undefined) => Promise<void>;
        deleteOneItemById: (id: string | import("bson").ObjectID, options?: import("mongodb").DeleteOptions | undefined) => Promise<import("mongodb").DeleteResult>;
        deleteManyItemById: (idList: (string | import("bson").ObjectID)[], options?: import("mongodb").DeleteOptions | undefined) => Promise<import("mongodb").DeleteResult>;
    };
};
export {};
//# sourceMappingURL=information.company.d.ts.map