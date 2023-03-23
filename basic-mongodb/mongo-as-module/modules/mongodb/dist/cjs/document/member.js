"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daoFactory = exports.collectionName = void 0;
const document_base_1 = require("../modules/document.base");
exports.collectionName = 'member';
function daoFactory(client) {
    return class Dao extends document_base_1.DaoBase {
        constructor(user) {
            super(client, user, exports.collectionName);
            this.setUniqueIndexTarget('id');
        }
        getItemListWithoutSecret = async () => {
            const list = await this.getItemList({
                projection: {
                    password: 0,
                    salt: 0,
                },
            });
            return list;
        };
        getOneMemberByIdWithSecret = async (userId) => {
            return await this._findOne({ id: userId });
        };
        getManyMemberByRoleIdWithOutSecret = async (roleIds) => {
            const list = await this._find({
                roleId: {
                    $in: roleIds,
                },
            }, {
                projection: {
                    password: 0,
                    salt: 0,
                },
            });
            return list;
        };
        getOneMemberByMemberIdWithOutSecret = async (id) => {
            const list = await this._findOne({
                id,
            }, {
                projection: {
                    password: 0,
                    salt: 0,
                },
            });
            return list;
        };
    };
}
exports.daoFactory = daoFactory;
//# sourceMappingURL=member.js.map