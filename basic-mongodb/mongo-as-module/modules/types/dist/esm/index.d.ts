export type { UserInfo } from './user/index';
export * as ApiTypes from './api/index';
export * as AuthTypes from './auth/index';
export * as ConnectorTypes from './connector/index';
export * as DataTypes from './data/index';
export * as DocumentTypes from './document/index';
export * as MariadbTypes from './mariadb/index';
export * as FastifyTypes from './fastify/index';
export * as FiTypes from './fi/index';
export * as InformationTypes from './information/index';
export * as UserTypes from './user/index';
export * as MenuTypes from './menu/index';
export * as ShareTypes from './share/index';
declare global {
    type Expand<T> = T extends infer O ? {
        [K in keyof O]: O[K];
    } : never;
    type ExpandR<T> = T extends object ? (T extends infer O ? {
        [K in keyof O]: ExpandR<O[K]>;
    } : never) : T;
    type UnPromisify<T> = T extends Promise<infer U> ? U : T;
}
//# sourceMappingURL=index.d.ts.map