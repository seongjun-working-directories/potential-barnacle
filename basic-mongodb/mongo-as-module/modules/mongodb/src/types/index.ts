import type { ObjectId } from 'mongodb';

export interface DefaultFields {
  c_user: string;
  c_date: Date;
  u_user?: string;
  u_date?: Date;
}

export type WithoutId<Document> = Omit<Document, '_id'>;

export type WithoutDefault<Document> = Omit<Document, '_id' | 'u_user' | 'u_date' | 'c_user' | 'c_date'>;

export type WithIdString<Document> = Omit<Document, '_id'> & { _id: string };

export type TSchema<T> = T & {
  _id: ObjectId;
} & DefaultFields;
