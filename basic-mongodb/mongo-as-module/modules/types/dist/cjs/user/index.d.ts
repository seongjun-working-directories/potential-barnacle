interface JWTPayload {
    /**
     * JWT Issuer - [RFC7519#section-4.1.1](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.1).
     */
    iss?: string;
    /**
     * JWT Subject - [RFC7519#section-4.1.2](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.2).
     */
    sub?: string;
    /**
     * JWT Audience [RFC7519#section-4.1.3](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.3).
     */
    aud?: string | string[];
    /**
     * JWT ID - [RFC7519#section-4.1.7](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.7).
     */
    jti?: string;
    /**
     * JWT Not Before - [RFC7519#section-4.1.5](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.5).
     */
    nbf?: number;
    /**
     * JWT Expiration Time - [RFC7519#section-4.1.4](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.4).
     */
    exp?: number;
    /**
     * JWT Issued At - [RFC7519#section-4.1.6](https://www.rfc-editor.org/rfc/rfc7519#section-4.1.6).
     */
    iat?: number;
    /**
     * Any other JWT Claim Set member.
     */
    [propName: string]: unknown;
}
export declare type UserPath = 'pc' | 'mobile' | 'app';
export interface UserInfoTokenPayload extends JWTPayload {
    id: string;
    path: UserPath;
    role: string;
    company: string;
    isInit: boolean;
    isAdmin: boolean;
}
export interface UserInfo {
    id: string;
    path: UserPath;
    /** @field 초기화 여부(초기화 상태에선 비밀번호 변경만 가능) */
    isInit: boolean;
    /** @field 역할(권한) */
    role: string;
    company: string;
    /** @field 관리자여부 */
    isAdmin: boolean;
    /** @field 소속 회사의 MongoDB DB 이름(스키마) */
    mongoKey: string;
    /** @field 소속 회사의 RDBMS DB 이름(스키마) */
    sqlKey: string;
    /** @field 소속 회사의 Redis DB 식별번호 */
    redisKey: number;
}
export {};
//# sourceMappingURL=index.d.ts.map