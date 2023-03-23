import type { UserInfo, InformationTypes } from '@mongomodule/types';
import type { MongoClient, Collection } from 'mongodb';
import type { TSchema } from '../types/index';
import { DaoBase } from '../modules/document.base';
import { DocumentTypes } from '@mongomodule/types';

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

export interface InformationCompanyDocumentWithDefault extends TSchema<NowDocument> {}
export const collectionName = 'informationCompany';
type NowDocument = InformationCompanyDocument;
export function daoFactory(client: MongoClient) {
  return class Dao extends DaoBase<NowDocument> {
    constructor(user: UserInfo) {
      super(client, user, collectionName);
    }
    getLatestInfo = async () => {
      return await this._findOne({
        isLatest: true,
      });
    };
    getOneItemByCompanyCode = async (code: string) => {
      return await this._findOne({
        companyCode: code,
      });
    };
    updateTotalDocumentLatestFalse = async () => {
      return await this._updateMany(
        {},
        {
          $set: {
            isLatest: false,
          },
        },
      );
    };
  };
}
