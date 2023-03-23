"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daoFactory = exports.collectionName = void 0;
const document_base_1 = require("../modules/document.base");
exports.collectionName = 'informationCompany';
function daoFactory(client) {
    return class Dao extends document_base_1.DaoBase {
        constructor(user) {
            super(client, user, exports.collectionName);
        }
        getLatestInfo = async () => {
            return await this._findOne({
                isLatest: true,
            });
        };
        getOneItemByCompanyCode = async (code) => {
            return await this._findOne({
                companyCode: code,
            });
        };
        updateTotalDocumentLatestFalse = async () => {
            return await this._updateMany({}, {
                $set: {
                    isLatest: false,
                },
            });
        };
    };
}
exports.daoFactory = daoFactory;
//# sourceMappingURL=information.company.js.map