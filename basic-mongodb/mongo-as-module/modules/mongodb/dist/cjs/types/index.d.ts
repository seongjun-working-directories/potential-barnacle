import type { ObjectId } from 'mongodb';
export interface DefaultFields {
    c_user: string;
    c_date: Date;
    u_user?: string;
    u_date?: Date;
}
export declare type WithoutId<Document> = Omit<Document, '_id'>;
export declare type WithoutDefault<Document> = Omit<Document, '_id' | 'u_user' | 'u_date' | 'c_user' | 'c_date'>;
export declare type WithIdString<Document> = Omit<Document, '_id'> & {
    _id: string;
};
export declare type TSchema<T> = T & {
    _id: ObjectId;
} & DefaultFields;
//# sourceMappingURL=index.d.ts.map