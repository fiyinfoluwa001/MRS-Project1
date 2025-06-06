import express, {Request, Response, NextFunction} from 'express';
import jwt, { Secret } from 'jsonwebtoken'
import { badRequest, notFound } from '../utils/errorhandler';
interface AuthRequest extends Request {
  user?: { userId: number; email: string };
}
export const authentication = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return badRequest(res, 'Authorization header missing or malformed', 400);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (
      typeof decoded === 'object' &&
      'userId' in decoded &&
      'email' in decoded
    ) {
      req.user = {
        userId: decoded.userId as number,
        email: decoded.email as string,
      };
      return next();
    } else {
      return notFound(res, 'Invalid token payload', 401);
    }
  } catch (err) {
    return notFound(res, 'Invalid or expired token', 401);
  }
};
export const generateToken = async (userId: number) => {
   const token = jwt.sign({userId}, process.env.JWT_SECRET! as Secret, {expiresIn: "7d"})
   return token;
}