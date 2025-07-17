import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender la interfaz Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        rol: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ 
        message: 'Token de acceso requerido',
        error: 'No authorization header provided' 
      });
      return;
    }

    // Verificar que el token tenga el formato correcto (Bearer token)
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ 
        message: 'Token de acceso requerido',
        error: 'No token provided' 
      });
      return;
    }

    // Verificar el token
    const secret = process.env.JWT_SECRET as string;
    
    if (!secret) {
      res.status(500).json({ 
        message: 'Error de configuración del servidor',
        error: 'JWT secret not configured' 
      });
      return;
    }

    const decoded = jwt.verify(token, secret) as {
      id: string;
      email: string;
      rol: string;
    };

    // Agregar la información del usuario al request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      rol: decoded.rol
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ 
        message: 'Token expirado',
        error: 'Token has expired' 
      });
      return;
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ 
        message: 'Token inválido',
        error: 'Invalid token' 
      });
      return;
    }

    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Middleware para verificar roles específicos
export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ 
          message: 'Usuario no autenticado',
          error: 'User not authenticated' 
        });
        return;
      }

      if (!allowedRoles.includes(req.user.rol)) {
        res.status(403).json({ 
          message: 'Acceso denegado',
          error: `Role '${req.user.rol}' not authorized. Required roles: ${allowedRoles.join(', ')}` 
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ 
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };
};

// Middleware opcional para verificar si el usuario es propietario del recurso
export const ownershipMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.user) {
      res.status(401).json({ 
        message: 'Usuario no autenticado',
        error: 'User not authenticated' 
      });
      return;
    }

    const resourceUserId = req.params.userId || req.params.id;
    
    // Permitir acceso si es admin o si es el propietario del recurso
    if (req.user.rol === 'admin' || req.user.id === resourceUserId) {
      next();
      return;
    }

    res.status(403).json({ 
      message: 'Acceso denegado',
      error: 'You can only access your own resources' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};