import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtCookieGuard } from '../guards/jwt-cookie.guard';

/**
 * Decorador que restringe el acceso al endpoint/controlador únicamente
 * a usuarios autenticados con rol 'admin'.
 *
 * El frontend debe enviar una Cookie HTTP Only con el nombre definido
 * en la variable de entorno COOKIE_NAME (por defecto 'token') que
 * contenga un JWT válido firmado con JWT_SECRET.
 *
 * @example
 * \@AdminOnly()
 * \@Controller('asocomunal')
 * export class AsocomunalController { ... }
 */
export const AdminOnly = () => applyDecorators(UseGuards(JwtCookieGuard));
