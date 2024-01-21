import jwt from 'jsonwebtoken';

export const signJWT = (payload: any) => jwt.sign(payload, process.env.JWT_SECRET!);

export const verifyJWT = (token: string) => jwt.verify(token, process.env.JWT_SECRET!);