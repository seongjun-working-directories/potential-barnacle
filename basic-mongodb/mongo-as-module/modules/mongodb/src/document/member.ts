import type { UserInfo } from '@mongomodule/types';
import type { ObjectId, MongoClient, Collection } from 'mongodb';
import type { TSchema } from '../types/index';
import { DaoBase } from '../modules/document.base';
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
export interface MemberDocumentWithDefault extends TSchema<NowDocument> {}
export const collectionName = 'member';
type NowDocument = MemberDocument;
export function daoFactory(client: MongoClient) {
  return class Dao extends DaoBase<NowDocument> {
    constructor(user: UserInfo) {
      super(client, user, collectionName);
      this.setUniqueIndexTarget('id');
    }
    getItemListWithoutSecret = async () => {
      const list = await this.getItemList({
        projection: {
          password: 0,
          salt: 0,
        },
      });
      return list as Omit<MemberDocumentWithDefault, 'password' | 'salt'>[];
    };
    getOneMemberByIdWithSecret = async (userId: string) => {
      return await this._findOne({ id: userId });
    };
    getManyMemberByRoleIdWithOutSecret = async (roleIds: ObjectId[]) => {
      const list = await this._find(
        {
          roleId: {
            $in: roleIds,
          },
        },
        {
          projection: {
            password: 0,
            salt: 0,
          },
        },
      );
      return list as Omit<MemberDocumentWithDefault, 'password' | 'salt'>[];
    };
    getOneMemberByMemberIdWithOutSecret = async (id: string) => {
      const list = await this._findOne(
        {
          id,
        },
        {
          projection: {
            password: 0,
            salt: 0,
          },
        },
      );
      return list as Omit<MemberDocumentWithDefault, 'password' | 'salt'>;
    };
  };
}
