import jwt from 'jsonwebtoken';

export const signJWT = (payload: any) => jwt.sign(payload, process.env.JWT_SECRET!);