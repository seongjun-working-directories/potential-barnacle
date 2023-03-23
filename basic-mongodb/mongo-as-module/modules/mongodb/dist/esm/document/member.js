import { DaoBase } from '../modules/document.base';
export const collectionName = 'member';
export function daoFactory(client) {
    return class Dao extends DaoBase {
        constructor(user) {
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
//# sourceMappingURL=member.js.map