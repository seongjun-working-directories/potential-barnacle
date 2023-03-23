"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daoFactory = exports.collectionName = void 0;
const mongodb_1 = require("mongodb");
const document_base_1 = require("../modules/document.base");
exports.collectionName = 'investmentFundReport';
function daoFactory(client) {
    return class Dao extends document_base_1.DaoBase {
        constructor(user) {
            super(client, user, exports.collectionName);
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
                        $each: [{ _id: new mongodb_1.ObjectId(), dateTime: new Date(), fileId, member: this._userInfo, memo }],
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
exports.daoFactory = daoFactory;
//# sourceMappingURL=investment.fund.report.js.map