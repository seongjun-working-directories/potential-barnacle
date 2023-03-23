export interface AuthApiItem {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
}
export interface AuthRole {
    role: string;
    api: AuthApiItem[];
}
//# sourceMappingURL=index.d.ts.map