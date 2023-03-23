import { DaoBase } from '../modules/document.base';
import { DocumentTypes } from '@mongomodule/types';
export const collectionName = 'informationCompany';
export function daoFactory(client) {
    return class Dao extends DaoBase {
        constructor(user) {
            super(client, user, collectionName);
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
//# sourceMappingURL=information.company.js.map