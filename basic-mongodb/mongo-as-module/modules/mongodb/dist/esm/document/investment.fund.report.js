import { ObjectId } from 'mongodb';
import { DaoBase } from '../modules/document.base';
export const collectionName = 'investmentFundReport';
export function daoFactory(client) {
    return class Dao extends DaoBase {
        constructor(user) {
            super(client, user, collectionName);
            this.setUniqueIndexTarget('investeeReportId', 'fundId');
        }
        getManyItemsInInvesteeReportIds = async (reportIds) => {
            return await this._find({
                investeeReportId: {
                    $in: reportIds,
                },
            });
        };
        getManyItemsInInvesteeReportIdsAndFundIds = async (investeeReportIds, fundIds) => {
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
        getItemsCountByInvesteeReportIds = async (reportIds) => {
            return await this._countDocument({
                investeeReportId: {
                    $in: reportIds,
                },
            });
        };
        updateNewConfirm = async (_id, fileId, memo) => {
            return await this._updateOne({
                _id,
            }, {
                $push: {
                    confirmList: {
                        $each: [{ _id: new ObjectId(), dateTime: new Date(), fileId, member: this._userInfo, memo }],
                        $sort: { dateTime: -1 },
                    },
                },
            });
        };
        updateConfirmMemo = async (_id, confirmId, memo) => {
            return await this._updateOne({
                _id,
                'confirmList._id': confirmId,
            }, {
                $set: {
                    'confirmList.$.memo': memo,
                },
            });
        };
    };
}
//# sourceMappingURL=investment.fund.report.js.map