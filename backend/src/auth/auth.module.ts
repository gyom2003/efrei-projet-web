import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.TOKEN_KEY || 'super-secret-key';

export function verifyToken(token: string) {
  if (!token) {
    throw new Error('No token provided');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
}
