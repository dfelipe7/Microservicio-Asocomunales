import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ROLES_KEY } from '../decorators/allow-roles.decorator';

interface JwtPayload {
  sub: string;
  email: string;
  nombre: string;
  rol: string;
}

/**
 * Guard que valida el JWT enviado como Cookie HTTP Only por el frontend.
 * Extrae el token de la cookie configurada en COOKIE_NAME,
 * lo verifica con JWT_SECRET y comprueba el rol del usuario.
 *
 * Lógica de autorización por rol:
 * - Si el método está decorado con @Public(), se permite sin validación.
 * - Si el método está decorado con @AllowRoles(...roles), se permite si
 *   el rol del usuario coincide con alguno de los roles indicados.
 * - En cualquier otro caso (comportamiento por defecto de @AdminOnly()),
 *   solo se permite el rol 'admin'.
 */
@Injectable()
export class JwtCookieGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const cookieName = process.env.COOKIE_NAME ?? 'token';
    const token: string | undefined = (
      request.cookies as Record<string, string>
    )?.[cookieName];

    if (!token) {
      throw new UnauthorizedException(
        'Token de autenticación no proporcionado',
      );
    }

    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    // Roles permitidos definidos con @AllowRoles() en el handler específico.
    // Si no se define ninguno, se exige el rol 'admin' por defecto.
    const allowedRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const requiredRoles = allowedRoles && allowedRoles.length > 0 ? allowedRoles : ['admin'];

    if (!requiredRoles.includes(payload.rol)) {
      throw new ForbiddenException(
        `Acceso restringido. Se requiere uno de los siguientes roles: ${requiredRoles.join(', ')}`,
      );
    }

    (request as Request & { user: JwtPayload }).user = payload;
    return true;
  }
}
