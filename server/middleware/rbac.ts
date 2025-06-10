import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define JWT_SECRET, ensuring consistency with server/routes.ts
// In a real application, this would come from an environment variable
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
    email: string;
  };
}

// Basic permissions structure (more granular version can be developed later)
// This is not directly used by the initial simple 'authorizeRole' but included for future use.
const permissions = {
  admin: {
    canManageAll: true,
    // Example: can access 'users' resource with 'create', 'read', 'update', 'delete' actions
    // users: ['create', 'read', 'update', 'delete'],
    // orders: ['read', 'update', 'delete']
  },
  user: {
    canViewPublic: true,
    canManageOwnOrders: true,
    // Example: can access 'orders' resource with 'create', 'readSelf' actions
    // orders: ['create', 'readSelf']
  },
};

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: "Unauthorized: Token expired" });
        }
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      // Assuming the JWT payload has id, role, and email
      req.user = {
        id: decoded.userId, // Ensure this matches the payload from /api/auth/login
        role: decoded.role,
        email: decoded.email
      };
      next();
    });
  } else {
    // No Authorization header, proceed without setting req.user for public routes
    // If a route strictly requires authentication, it should check req.user or use authorizeRole
    next();
    // If all routes behind this middleware must be authenticated, then:
    // return res.status(401).json({ message: "Unauthorized: No Authorization header" });
  }
};

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      // This can happen if authenticateJWT allows requests without tokens to pass through (for optional auth)
      // Or if authenticateJWT itself failed to set req.user for some reason (e.g. no token at all)
      return res.status(401).json({ message: "Unauthorized: Authentication required" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Role '${req.user.role}' does not have sufficient permissions. Allowed roles: ${allowedRoles.join(', ')}`
      });
    }
    next();
  };
};

// Example of a more granular permission check (for future reference)
/*
export const authorizePermission = (resource: string, action: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user context" });
    }

    const userRole = req.user.role as keyof typeof permissions;
    const userPermissions = permissions[userRole];

    if (!userPermissions) {
      return res.status(403).json({ message: "Forbidden: Role not found in permissions" });
    }

    // This is a simplified check. A real system might have more complex logic.
    if (userPermissions.canManageAll) {
      return next();
    }

    const resourcePermissions = userPermissions[resource as keyof typeof userPermissions] as string[];
    if (!resourcePermissions || !resourcePermissions.includes(action)) {
      return res.status(403).json({ message: `Forbidden: Role '${req.user.role}' cannot perform '${action}' on '${resource}'` });
    }

    next();
  };
};
*/
