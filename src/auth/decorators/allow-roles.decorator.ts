import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorador que especifica los roles permitidos para acceder a un endpoint.
 * Se usa junto con JwtCookieGuard para autorización basada en roles.
 *
 * @param roles - Lista de roles permitidos (ej: 'admin', 'operador').
 *
 * @example
 * \@AllowRoles('admin', 'operador')
 * \@Patch(':id/activate')
 * activate(@Param('id') id: string) { ... }
 */
export const AllowRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
