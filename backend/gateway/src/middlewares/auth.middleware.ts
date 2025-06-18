// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import routes from '../routes';
import config from '../configs';

// Extend Express Request interface to include 'user'


export interface UserPayload {
  id: string;
  role: 'user' | 'admin' | 'cashier';
  username: string
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const path = req.path;
  const method = req.method.toLowerCase();
  // match route
  const matchedRoute = Object.values(routes).find((route) =>{
    return path.startsWith(route.path)
  });

  if (!matchedRoute) {
    res.status(404).json({ message: 'Route not found in gateway config' });
    return;
  }

  const methodConfig = matchedRoute?.method?.[method]
  if (!methodConfig) {
    res.status(405).json({ message: 'Method not allowed for this route' });
    return;
  }

  if (!methodConfig.authRequired) {
    next();
    return;
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid access token' });
    return;
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, config.jwtSecret) as UserPayload;

    req.user! = decoded; // attach to request
    if (!methodConfig.roles.includes(decoded.role)) {
      res.status(403).json({ message: 'Insufficient role permissions' });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
}
