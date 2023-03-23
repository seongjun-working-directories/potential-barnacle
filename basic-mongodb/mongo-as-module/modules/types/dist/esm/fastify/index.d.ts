export declare type Body<T = void> = {
    Body: T;
};
export declare type Query<T = void> = {
    Querystring: T;
};
export declare type Params<T = void> = {
    Params: T;
};
export declare type RouterReturn<T = void> = Promise<T | void>;
export declare type ErrorLevel = 'info' | 'error' | 'debug' | 'fatal' | 'warn' | 'trace' | 'child';
//# sourceMappingURL=index.d.ts.map