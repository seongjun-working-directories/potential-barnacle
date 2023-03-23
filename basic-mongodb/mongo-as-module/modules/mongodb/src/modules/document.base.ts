import type {
  Document,
  Filter,
  FindOptions,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  BulkWriteOptions,
  InsertOneOptions,
  DeleteOptions,
  CountDocumentsOptions,
} from 'mongodb';

import type { DefaultFields, TSchema } from '../types/index';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

type UserPath = 'pc' | 'mobile' | 'app';

export type UserInfo = {
  id: string;
  path: UserPath;
  isInit: boolean;
  role: string;
  company: string;
  mongoKey: string;
  sqlKey: string;
  redisKey: number;
};

// [TSType]
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
// // Record<K extends keyof any, T> 타입 예시
// interface CatInfo {
//   age: number;
//   breed: string;
// }

// type CatName = "miffy" | "boris" | "mordred";

// const cats: Record<CatName, CatInfo> = {
//   miffy: { age: 10, breed: "Persian" },
//   boris: { age: 5, breed: "Maine Coon" },
//   mordred: { age: 16, breed: "British Shorthair" },
// };

export const error = (msg: string, originError?: any) => {
  console.log('originError :>> ', originError ?? '없음');
  return new Error(msg);
};

type UpdateDocument<T> = Partial<T & DefaultFields> & { _id: string | ObjectId };
const indexChecker: Record<string, Record<string, boolean>> = {};

export class DaoBase<D extends Document = Document> {
  /*
  Class Fields
  */
  _fixedDatabase: string | null = null;
  _isKeepInstance = false;
  _isLinkedInstance = false;
  _linkInstance: any | null = null;
  _db: Db | null = null;
  _collection: Collection<TSchema<D>> | null = null;
  _client: MongoClient;
  _collectionName: string;
  _userInfo: UserInfo;
  _uniqueIndexTarget: string[][] = [];
  dateQueryUtil = {
    getCurrentDate: (inputDate: string) => {
      const date = new Date(inputDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const today = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const milliseconds = date.getMilliseconds();
      return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
    },
    fromDate: (date: string) => new Date(`${date}T00:00:00.000`),
    toDate: (date: string) => new Date(`${date}T23:59:59.999`),
    getFromToQuery: (date: [string, string] | string[]) => {
      return {
        $gte: getCurrentDate(fromDate(date[0])),
        $lte: getCurrentDate(toDate(date[1])),
      };
    },
    getDayToQuery: (date: string) => {
      return {
        $gte: getCurrentDate(fromDate(date)),
        $lte: getCurrentDate(toDate(date)),
      };
    },
  };

  /*
  Constructor
  */
  constructor(client: MongoClient, userInfo: UserInfo, collectionName: string) {
    this._client = client;
    this._collectionName = collectionName;
    this._userInfo = userInfo;
  }

  /*
  Class Methods
  */
  // 1. db명을 입력받음
  fix = (database: string) => {
    this._fixedDatabase = database;
  };

  // 2. 전달받은 db 클래스를 _db 프로퍼티에 등록
  _link = async (db: Db) => {
    // _isKeepInstance와 _isLinkedInstance를 true로 설정
    this._isKeepInstance = true;
    this._isLinkedInstance = true;
    this._db = db;
  };

  // 3. _db 프로퍼티를 제거
  _unLink = async () => {
    // _isKeepInstance와 _isLinkedInstance를 false로 설정
    this._isKeepInstance = false;
    this._isLinkedInstance = false;
    this._db = null;
    this._collection = null;
  };

  // 4. MongoClient에 접근하여, fix에서 설정한 db 이름의 실제 데이터베이스를 반환함
  _getDb = async () => {
    await this._client.connect();
    const db = await this._client.db(this._fixedDatabase ? this._fixedDatabase : this._userInfo.mongoKey);
    return db;
  };

  // 5. _db와 _collection 프로퍼티에 등록되어 있는 객체들을 제거
  _close = async () => {
    try {
      this._db = null;
      this._collection = null;
    } catch (error) {
      console.error('error :>> ', error);
      throw error;
    }
  };

  // 6.
  start = async (instanceList?: any[]) => {
    this._isKeepInstance = true;
    this._db = await this._getDb();

    // instanceList의 요소들은 DaoBase를 상속받은 Dao 객체로
    // 일반적으로 해당 Dao 객체의 생성자는 fix() 메서드를 실행함
    // 여기서 DaoBase는 modules/mongodb/document 안에 있는 파일이 export한 daoFactory의 반환값을 받는데
    // daoFactory의 코드 예시는 다음과 같음
    // export function daoFactory(client: MongoClient) {
    //   return class Dao extends DaoBase<NowDocument> {
    //     constructor(user: UserInfo) {
    //       super(client, user, collectionName);
    //     }
    //     getManyItemsByUniqueId = async (uniqueId: string, exceptId: ObjectId) => {
    //       const res = await this._find({
    //         uniqueId: uniqueId,
    //         _id: { $ne: exceptId },
    //       });
    //       return res;
    //     };
    //     setReceiveServer = async (_id: string, serverPath: string) => {
    //       await this._updateOne(
    //         { _id: new ObjectId(_id) },
    //         { $push: { receiveServerList: serverPath } },
    //       );
    //     };
    //   };
    // }

    if (!instanceList) return;

    instanceList.forEach(async (targetInstance) => {
      if (typeof targetInstance.link === 'function') {
        await targetInstance.link(this._db);
      }
    });
    return;
  };

  // 7.
  end = async () => {
    await this._unLink();
    await this._close();
    if (this._linkInstance) {
      this._linkInstance.forEach(async (targetInstance: any) => {
        if (typeof targetInstance.link === 'function') {
          await targetInstance.unLink();
        }
      });
    }
  };

  // 8. collection을 인자로 받아 _unqiueIndexTarget에 설정된 속성을 Unique Index 값으로 설정함
  _setUniqueIndex = (collection: Collection<TSchema<D>>) => {
    //  index 추가 시 wirte 작업은 느려질 수 있음
    // 따라서 index는 read 작업 위주의 애플리케션에서 유용하고 읽기보다 쓰기 작업이 많으면 index를 추가하는 것은 고려해야 함
    this._uniqueIndexTarget.forEach(async (el) => {
      if (!el.length) return;
      // string으로 선언된 모든 프로퍼티는 1이라는 값을 부여받아야 함
      // 1: 오름차순, -1: 내림차순
      const indexSpec: Record<string, 1> = {};
      el.forEach((col) => (indexSpec[col] = 1));
      // col 예시 : ['investeeReportId', 'fundId'], ['mongoKey'], ['redisKey'], ...
      // indexSpec에 요소로 존재하는 값들(ex_ investeeReportId)을 기준으로 오름차순(1) 정렬됨
      await collection.createIndex(indexSpec, { unique: true });
    });
  };

  // export declare interface Document {
  //  [key: string]: any;
  // }

  // 9. _uniqueIndexTarget 배열에 인자를 추가함 -> investment.fund.report.ts 파일에서 확인 가능
  setUniqueIndexTarget = (...arg: (keyof D)[]) => {
    // 함수 사용 예시: this.setUniqueIndexTarget('investeeReportId', 'fundId');
    this._uniqueIndexTarget.push(arg as unknown as string[]);
  };

  // 10.
  _getCollection = async () => {
    try {
      // _isKeepInstance가 true인 경우, 현재 db를 가져오고
      // _isKeepInstance가 false인 경우, _fixedDatabase에 설정된 데이터베이스를 가져옴
      const db = this._isKeepInstance ? this._db : await this._getDb();
      if (!db) throw error('no database');
      // db.collection : Returns a reference to a MongoDB Collection.
      const collection = await db.collection<TSchema<D>>(this._collectionName);
      const nowDatabasename = db.databaseName;
      // _setUniqueIndex로 unique index가 설정되었다면, indexChecker는 빈 객체가 아님
      if (!indexChecker[nowDatabasename]) {
        indexChecker[nowDatabasename] = {};
        indexChecker[nowDatabasename][this._collectionName] = true;
        await this._setUniqueIndex(collection);
      } else {
        if (!indexChecker[nowDatabasename][this._collectionName]) {
          await this._setUniqueIndex(collection);
        }
      }
      // _collectionName으로 설정된 collection을 mongodb에서 가져와 _collection 속성에 주입
      this._collection = collection;
      return collection;
    } catch (error) {
      console.error('error :>> ', error);
      throw error;
    }
  };

  // filter: Filter<TSchema<D>> 안에는 BSON 형태의 QUERY가 들어감

  // 연산자(Query Selectors) : 도큐먼트 조회 시 여러가지 연산자를 이용해 조회 조건을 줄 수 있음

  // 비교연산자(Comparison)
  // $eq	지정된 값과 같은 값을 찾는다.
  // $gt	지정된 값보다 큰 값을 찾는다.
  // $gte	지정된 값보다 크거나 같은 값을 찾는다.
  // $in	배열에 속하는 값을 찾는다.
  // $lt	지정된 값보다 작은 값을 찾는다.
  // $lte	지정된 값보다 작거나 같은 값을 찾는다.
  // $ne	지정된 값과 같지 않은 값을 찾는다.
  // $nin	배열에 속하지 않는 값을 찾는다.

  // 논리연산자(Logical)
  // $and	두 절의 조건과 일치하는 모든 도큐먼트를 반환한다.
  // $not	조건과 일치하지 않는 도큐먼트를 반환한다.
  // $or	두 절의 조건 중 하나라도 일치하는 도큐먼트를 반환한다.
  // $nor	두 절의 조건과 모두 일치하지 않는 도큐먼트를 반환한다.

  // 11. collection.findOne();
  _findOne = async (filter: Filter<TSchema<D>>, options?: FindOptions<TSchema<D>>) => {
    try {
      const collection = this._collection ?? (await this._getCollection());
      return await collection.findOne(filter, options);
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 12. collection.find().toArray();
  _find = async (filter: Filter<TSchema<D>>, options?: FindOptions<TSchema<D>>) => {
    try {
      const collection = this._collection ?? (await this._getCollection());
      const list = await collection.find(filter, options).toArray();
      return list;
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 13. collection.countDocuments();
  _countDocument = async (filter: Filter<TSchema<D>> = {}, options?: CountDocumentsOptions) => {
    try {
      const collection = this._collection ?? (await this._getCollection());
      const count = options
        ? await collection.countDocuments(filter, options)
        : await collection.countDocuments(filter);
      return count;
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 14. collection.insertOne()
  _insertOne = async (doc: OptionalUnlessRequiredId<TSchema<D>>, options: InsertOneOptions = {}) => {
    // OptionalUnlessRequiredId 타입은 다음의 특징을 갖고 있음
    // - _id 라는 속성을 무조건 포함함
    // - 모든 속성은 string 형태로 저장되어 있음
    try {
      const collection = this._collection ?? (await this._getCollection());
      return await collection.insertOne(doc, options);
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 15. collection.insertMany()
  _insertMany = async (docs: OptionalUnlessRequiredId<TSchema<D>>[], options: BulkWriteOptions = {}) => {
    try {
      const collection = this._collection ?? (await this._getCollection());
      return await collection.insertMany(docs, options);
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 16. collection.updateOne()
  _updateOne = async (
    filter: Filter<TSchema<D>>,
    update: Partial<TSchema<D>> | UpdateFilter<TSchema<D>>,
    options: UpdateOptions = {},
  ) => {
    try {
      const collection = this._collection ?? (await this._getCollection());
      // updateOne({조건}, {수정사항}, {옵션});
      // - 조건 : findOne과 동일
      // - 수정사항 : ex_ { $inc: { qty: 10 } }, ex_ { $set: {zip: 5051 } }
      // - Field Update Operator
      //    - $inc(증가),
      //    - $rename,
      //    - $set(값 변경),
      //    - $setOnInsert(used to set values to fields during an upsert only),
      //    - $unset(used to delete a particular field, ex_{ $unset: {"purqty": ""}})
      // - Array Update Operator : $addToSet, $pop, $pull, $pullAll, $push

      return await collection.updateOne(filter, update, options);
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 17. collection.updateMany()
  _updateMany = async (
    filter: Filter<TSchema<D>>,
    update: Partial<TSchema<D>> | UpdateFilter<TSchema<D>>,
    options: UpdateOptions = {},
  ) => {
    try {
      const collection = this._collection ?? (await this._getCollection());
      return await collection.updateMany(filter, update, options);
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 18. collection.deleteOne()
  _deleteOne = async (filter: Filter<TSchema<D>>, options: DeleteOptions = {}) => {
    try {
      const collection = this._collection ?? (await this._getCollection());
      return await collection.deleteOne(filter, options);
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 19. collection.deleteMany()
  _deleteMany = async (filter: Filter<TSchema<D>>, options: DeleteOptions = {}) => {
    try {
      const collection = this._collection ?? (await this._getCollection());
      return await collection.deleteMany(filter, options);
    } finally {
      // 유지할 필요가 있는 인스턴스가 아닌 경우, 연결된 db 및 collection를 제거
      if (!this._isKeepInstance) await this._close();
    }
  };

  // 20. Document에 c_user와 c_date를 붙임
  _getCreateInfoDocument = (docList: D[]): OptionalUnlessRequiredId<TSchema<D>>[] => {
    // OptionalUnlessRequiredId 타입은 다음의 특징을 갖고 있음
    // - _id 라는 속성을 무조건 포함함
    // - 모든 속성은 string 형태로 저장되어 있음
    return docList.map((doc) => {
      // Object.assign : 출처 객체들의 모든 열거 가능한 자체 속성을 복사해 대상 객체에 붙여넣은 뒤 해당 객체를 반환
      // 즉, docList의 doc 마다 c_user, c_date 속성을 붙여서 반환함
      return Object.assign(
        {
          c_user: this._userInfo.id,
          c_date: new Date(),
        },
        doc,
      );
    }) as any;
  };

  // 21. Document에 c_user와 c_date를 업데이트함
  _getUpdateInfoDocument = (docList: UpdateDocument<D>[]) => {
    // UpdateDocument 타입은 OptionalUnlessRequiredId에 c_user, c_date, u_user, u_date가 추가된 형태임
    return docList.map((x) => {
      return Object.assign(
        {
          u_user: this._userInfo.id,
          u_date: new Date(),
        },
        x,
      );
    });
  };

  // 22. string 타입의 인자를 받아 Mongodb의 ObjectId 타입으로 변경함
  _getObjectId = (id: string | ObjectId) => (typeof id === 'string' ? new ObjectId(id) : id);

  // 23. string과 ObjectId가 혼재된 배열에서 string 타입 값만 ObjectId 타입으로 변경함
  _getObjectIdList = (idList: (string | ObjectId)[]) =>
    idList.map((x) => (typeof x === 'string' ? new ObjectId(x) : x));

  // 24.
  getItemList = async (options?: FindOptions<TSchema<D>>) => {
    const list = await this._find({}, options);
    return list;
  };

  // 25. string 'id' -> ObjectId '_id' -> findOneById(filter가 id, options는 주입받음)
  getOneItemById = async (id: string | ObjectId, options?: FindOptions<TSchema<D>>) => {
    return await this._findOne({ _id: this._getObjectId(id) } as Filter<TSchema<D>>, options);
  };

  // 26. (string|ObjectId)[] 'idList' -> ObjectId[] 'idList' -> _find(filter가 idList, options는 주입받음)
  getManyItemById = async (idList: (string | ObjectId)[], options?: FindOptions<TSchema<D>>) => {
    return await this._find(
      {
        _id: {
          // $in : 배열에 속하는 값을 찾음
          $in: this._getObjectIdList(idList),
        },
      } as Filter<TSchema<D>>,
      options,
    );
  };

  // 27. _getCreateInfoDocument -> _insertOne
  insertOneItem = async (insertItem: D, options: InsertOneOptions = {}) => {
    return await this._insertOne(this._getCreateInfoDocument([insertItem])[0], options);
  };

  // 28. _getCreateInfoDocument -> _insertMany
  insertManyItem = async (insertItemList: D[], options: BulkWriteOptions = {}) => {
    return await this._insertMany(this._getCreateInfoDocument(insertItemList), options);
  };

  // 29. updateItem -> _updateOne
  updateOneItem = async (updateItem: UpdateDocument<D>, options?: UpdateOptions) => {
    const { _id, ...documentArg } = updateItem;
    await this._updateOne(
      { _id: this._getObjectId(_id) } as Filter<TSchema<D>>,
      {
        $set: {
          ...documentArg,
        },
      } as UpdateFilter<TSchema<D>>,
      options,
    );
  };

  // 30. updateItemList -> _updateOne on each item
  updateManyItem = async (updateItemList: UpdateDocument<D>[], options?: UpdateOptions) => {
    const updateDocumentList = this._getUpdateInfoDocument(updateItemList);
    for (let i = 0, lenI = updateDocumentList.length; i < lenI; i++) {
      const { _id, ...documentArg } = updateDocumentList[i];
      await this._updateOne(
        { _id: this._getObjectId(_id) } as Filter<TSchema<D>>,
        {
          $set: {
            ...documentArg,
          },
        } as UpdateFilter<TSchema<D>>,
        options,
      );
    }
  };

  // 31. id -> _getObjectId -> _deleteOne
  deleteOneItemById = async (id: string | ObjectId, options?: DeleteOptions) => {
    const res = await this._deleteOne(
      {
        _id: this._getObjectId(id),
      } as Filter<TSchema<D>>,
      options,
    );
    return res;
  };

  // 32. idList -> _getObjectIdList -> deleteMany
  deleteManyItemById = async (idList: (string | ObjectId)[], options?: DeleteOptions) => {
    const res = await this._deleteMany(
      {
        _id: {
          $in: this._getObjectIdList(idList),
        },
      } as Filter<TSchema<D>>,
      options,
    );
    return res;
  };
}

export function getCurrentDate(inputDate?: string | Date) {
  const date = inputDate ? (typeof inputDate === 'string' ? new Date(inputDate) : inputDate) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

export const fromDate = (date: string) => new Date(`${date}T00:00:00.000`);
export const toDate = (date: string) => new Date(`${date}T23:59:59.999`);
export const getFromToQuery = (date: [string, string] | string[]) => {};
