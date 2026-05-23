import { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: number;
  headers: Request['headers'];
  query: Request['query'];
  params: Request['params'];
  body: Request['body'];
}
