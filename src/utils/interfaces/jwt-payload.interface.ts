export interface JwtPayload {
    emailUser: string;
    username: string;
    iat: number;
    exp: number;
}