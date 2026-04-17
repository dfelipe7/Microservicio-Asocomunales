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

interface JwtPayload {
  sub: string;
  email: string;
  nombre: string;
  rol: string;
}

/**
 * Guard que valida el JWT enviado como Cookie HTTP Only por el frontend.
 * Extrae el token de la cookie configurada en COOKIE_NAME,
 * lo verifica con JWT_SECRET y comprueba que el rol sea 'admin'.
 *
 * Si el método o controlador está decorado con @Public(), el acceso
 * se permite sin validación.
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
    const token: string | undefined = (request.cookies as Record<string, string>)?.[cookieName];

    if (!token) {
      throw new UnauthorizedException('Token de autenticación no proporcionado');
    }

    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    if (payload.rol !== 'admin') {
      throw new ForbiddenException('Acceso restringido al rol admin');
    }

    (request as Request & { user: JwtPayload }).user = payload;
    return true;
  }
}
