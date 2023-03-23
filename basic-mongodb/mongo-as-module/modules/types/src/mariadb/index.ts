export type { UserInfo } from '../index';

type BaseObject = {
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

// REFACTORME: 인터페이스 이름이 너무 흔합니다. 이름을 좀 더 좋게 만들어야 합니다.
export interface Model<RecordType = BaseObject> {
  version: string;
  target: ('vc' | 'startup')[];
  table: string;
  columns: Column<Extract<keyof RecordType, string>>[];
  constraints: Constraint[];
}

// REFACTORME: 인터페이스 이름이 너무 흔합니다. 이름을 좀 더 좋게 만들어야 합니다.
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

// REFACTORME: 인터페이스 이름이 너무 흔합니다. 이름을 좀 더 좋게 만들어야 합니다.
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

// DELETEME: 사용되지 않는 인터페이스인 것 같습니다.
// export interface PoolConfig {
//   host: string;
//   port: number;
//   user: string;
//   password: string;
//   database: string;
//   mode: 'dev' | 'product';
// }

export type WithoutId<Document> = Omit<Document, '_id'>;
export type WithoutDefault<Document> = Omit<Document, '_id' | 'u_user' | 'u_date' | 'c_user' | 'c_date'>;
export type WithIdString<Document> = Omit<Document, '_id'> & { _id: string; };
