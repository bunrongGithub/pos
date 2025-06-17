// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface UserPayload {
  id: string;
  role: 'user' | 'admin' | 'cashier';
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path;
  const method = req.method.toLowerCase();

  // match route
  const matchedRoute = Object.values(routes).find((route) =>
    path.startsWith(route.path)
  );

  if (!matchedRoute) {
    return res.status(404).json({ message: 'Route not found in gateway config' });
  }

  const methodConfig = matchedRoute.method?.[method];
  if (!methodConfig) {
    return res.status(405).json({ message: 'Method not allowed for this route' });
  }

  if (!methodConfig.authRequired) {
    return next();
  }

  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid access token' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, config.jwtSecret) as UserPayload;

    req.user = decoded; // attach to request
    if (!methodConfig.roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Insufficient role permissions' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
