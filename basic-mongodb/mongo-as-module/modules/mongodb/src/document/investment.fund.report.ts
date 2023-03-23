import type { UserInfo } from '../modules/document.base';
import type { TSchema } from '../types/index';
import { ObjectId, type MongoClient } from 'mongodb';

import { DaoBase } from '../modules/document.base';

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

export interface FundReportDocumentWithDefault extends TSchema<NowDocument> {}
export const collectionName = 'investmentFundReport';
type NowDocument = FundReportDocument;

export function daoFactory(client: MongoClient) {
  return class Dao extends DaoBase<NowDocument> {
    constructor(user: UserInfo) {
      super(client, user, collectionName);
      this.setUniqueIndexTarget('investeeReportId', 'fundId');
    }
    getManyItemsInInvesteeReportIds = async (reportIds: ObjectId[]) => {
      return await this._find({
        investeeReportId: {
          $in: reportIds,
        },
      });
    };
    getManyItemsInInvesteeReportIdsAndFundIds = async (investeeReportIds: ObjectId[], fundIds: ObjectId[]) => {
      return await this._find({
        $and: [
          {
            investeeReportId: {
              $in: investeeReportIds,
            },
          },
          {
            fundId: {
              $in: fundIds,
            },
          },
        ],
      });
    };
    getItemsCountByInvesteeReportIds = async (reportIds: ObjectId[]) => {
      return await this._countDocument({
        investeeReportId: {
          $in: reportIds,
        },
      });
    };
    updateNewConfirm = async (_id: ObjectId, fileId: ObjectId, memo: string) => {
      return await this._updateOne(
        {
          _id,
        },
        {
          $push: {
            confirmList: {
              $each: [{ _id: new ObjectId(), dateTime: new Date(), fileId, member: this._userInfo, memo }],
              $sort: { dateTime: -1 },
            },
          },
        },
      );
    };
    updateConfirmMemo = async (_id: ObjectId, confirmId: ObjectId, memo: string) => {
      return await this._updateOne(
        {
          _id,
          'confirmList._id': confirmId,
        },
        {
          $set: {
            'confirmList.$.memo': memo,
          },
        },
      );
    };
  };
}
