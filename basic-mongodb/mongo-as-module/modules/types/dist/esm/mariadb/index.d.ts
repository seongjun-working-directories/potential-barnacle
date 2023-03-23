export type { UserInfo } from '../index';
declare type BaseObject = {
    [key: string]: any;
};
export interface DefaultFields {
    idx: number;
    use: number;
    c_user: string;
    c_date: Date;
    u_user?: string;
    u_date?: Date;
}
export interface Model<RecordType = BaseObject> {
    version: string;
    target: ('vc' | 'startup')[];
    table: string;
    columns: Column<Extract<keyof RecordType, string>>[];
    constraints: Constraint[];
}
export interface Column<Name = string> {
    version: string;
    key: string;
    name: Name;
    type: 'VARCHAR' | 'INT' | 'DATE' | 'DATETIME' | 'TEXT' | 'TINYINT' | 'BIGINT' | 'SMALLINT';
    length?: number;
    unsigned?: boolean;
    pk?: boolean;
    autoIncrement?: boolean;
    nullable?: boolean;
    default?: string | number;
    comment?: string;
}
export interface Constraint {
    key: string;
    type: 'pk' | 'fk' | 'unique' | 'index' | 'check';
    columns: string[];
    references?: {
        table: string;
        columns: string[];
        onUpdate?: 'CASCADE' | 'RESTRICT' | 'NO ACTION' | 'SET NULL';
        onDelete?: 'CASCADE' | 'RESTRICT' | 'NO ACTION' | 'SET NULL';
    };
    checkCondition?: string;
}
export declare type WithoutId<Document> = Omit<Document, '_id'>;
export declare type WithoutDefault<Document> = Omit<Document, '_id' | 'u_user' | 'u_date' | 'c_user' | 'c_date'>;
export declare type WithIdString<Document> = Omit<Document, '_id'> & {
    _id: string;
};
//# sourceMappingURL=index.d.ts.map