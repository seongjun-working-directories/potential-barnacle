import type { UserInfo } from '@mongomodule/types';
import type { ObjectId, MongoClient, Collection } from 'mongodb';
import type { TSchema } from '../types/index';
export interface MemberDocument {
    id: string;
    password: string;
    salt: string;
    roleId: ObjectId;
    organizationId: ObjectId;
    name: string;
    mobile: string;
    telephone: string;
    fax: string;
    email: string;
    address: string;
    isAdmin: boolean;
    isInit: boolean;
    isVirtual: boolean;
    isResignation: boolean;
}
export interface MemberDocumentWithDefault extends TSchema<NowDocument> {
}
export declare const collectionName = "member";
declare type NowDocument = MemberDocument;
export declare function daoFactory(client: MongoClient): {
    new (user: UserInfo): {
        getItemListWithoutSecret: () => Promise<Omit<MemberDocumentWithDefault, "password" | "salt">[]>;
        getOneMemberByIdWithSecret: (userId: string) => Promise<TSchema<MemberDocument> | null>;
        getManyMemberByRoleIdWithOutSecret: (roleIds: ObjectId[]) => Promise<Omit<MemberDocumentWithDefault, "password" | "salt">[]>;
        getOneMemberByMemberIdWithOutSecret: (id: string) => Promise<Omit<MemberDocumentWithDefault, "password" | "salt">>;
        _fixedDatabase: string | null;
        _isKeepInstance: boolean;
        _isLinkedInstance: boolean;
        _linkInstance: any;
        _db: import("mongodb").Db | null;
        _collection: Collection<TSchema<MemberDocument>> | null;
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
        _setUniqueIndex: (collection: Collection<TSchema<MemberDocument>>) => void;
        setUniqueIndexTarget: (...arg: (keyof MemberDocument)[]) => void;
        _getCollection: () => Promise<Collection<TSchema<MemberDocument>>>;
        _findOne: (filter: import("mongodb").Filter<TSchema<MemberDocument>>, options?: import("mongodb").FindOptions<TSchema<MemberDocument>> | undefined) => Promise<TSchema<MemberDocument> | null>;
        _find: (filter: import("mongodb").Filter<TSchema<MemberDocument>>, options?: import("mongodb").FindOptions<TSchema<MemberDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<MemberDocument>>[]>;
        _countDocument: (filter?: import("mongodb").Filter<TSchema<MemberDocument>>, options?: import("mongodb").CountDocumentsOptions | undefined) => Promise<number>;
        _insertOne: (doc: TSchema<MemberDocument>, options?: import("mongodb").InsertOneOptions) => Promise<import("mongodb").InsertOneResult<TSchema<MemberDocument>>>;
        _insertMany: (docs: TSchema<MemberDocument>[], options?: import("mongodb").BulkWriteOptions) => Promise<import("mongodb").InsertManyResult<TSchema<MemberDocument>>>;
        _updateOne: (filter: import("mongodb").Filter<TSchema<MemberDocument>>, update: Partial<TSchema<MemberDocument>> | import("mongodb").UpdateFilter<TSchema<MemberDocument>>, options?: import("mongodb").UpdateOptions) => Promise<import("mongodb").UpdateResult>;
        _updateMany: (filter: import("mongodb").Filter<TSchema<MemberDocument>>, update: Partial<TSchema<MemberDocument>> | import("mongodb").UpdateFilter<TSchema<MemberDocument>>, options?: import("mongodb").UpdateOptions) => Promise<import("bson").Document | import("mongodb").UpdateResult>;
        _deleteOne: (filter: import("mongodb").Filter<TSchema<MemberDocument>>, options?: import("mongodb").DeleteOptions) => Promise<import("mongodb").DeleteResult>;
        _deleteMany: (filter: import("mongodb").Filter<TSchema<MemberDocument>>, options?: import("mongodb").DeleteOptions) => Promise<import("mongodb").DeleteResult>;
        _getCreateInfoDocument: (docList: MemberDocument[]) => TSchema<MemberDocument>[];
        _getUpdateInfoDocument: (docList: (Partial<MemberDocument & import("../types/index").DefaultFields> & {
            _id: string | ObjectId;
        })[]) => ({
            u_user: string;
            u_date: Date;
        } & Partial<MemberDocument & import("../types/index").DefaultFields> & {
            _id: string | ObjectId;
        })[];
        _getObjectId: (id: string | ObjectId) => ObjectId;
        _getObjectIdList: (idList: (string | ObjectId)[]) => ObjectId[];
        getItemList: (options?: import("mongodb").FindOptions<TSchema<MemberDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<MemberDocument>>[]>;
        getOneItemById: (id: string | ObjectId, options?: import("mongodb").FindOptions<TSchema<MemberDocument>> | undefined) => Promise<TSchema<MemberDocument> | null>;
        getManyItemById: (idList: (string | ObjectId)[], options?: import("mongodb").FindOptions<TSchema<MemberDocument>> | undefined) => Promise<import("mongodb").WithId<TSchema<MemberDocument>>[]>;
        insertOneItem: (insertItem: MemberDocument, options?: import("mongodb").InsertOneOptions) => Promise<import("mongodb").InsertOneResult<TSchema<MemberDocument>>>;
        insertManyItem: (insertItemList: MemberDocument[], options?: import("mongodb").BulkWriteOptions) => Promise<import("mongodb").InsertManyResult<TSchema<MemberDocument>>>;
        updateOneItem: (updateItem: Partial<MemberDocument & import("../types/index").DefaultFields> & {
            _id: string | ObjectId;
        }, options?: import("mongodb").UpdateOptions | undefined) => Promise<void>;
        updateManyItem: (updateItemList: (Partial<MemberDocument & import("../types/index").DefaultFields> & {
            _id: string | ObjectId;
        })[], options?: import("mongodb").UpdateOptions | undefined) => Promise<void>;
        deleteOneItemById: (id: string | ObjectId, options?: import("mongodb").DeleteOptions | undefined) => Promise<import("mongodb").DeleteResult>;
        deleteManyItemById: (idList: (string | ObjectId)[], options?: import("mongodb").DeleteOptions | undefined) => Promise<import("mongodb").DeleteResult>;
    };
};
export {};
//# sourceMappingURL=member.d.ts.map