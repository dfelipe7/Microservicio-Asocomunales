import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorador que marca un endpoint como público, eximiéndolo de la
 * validación de JWT y rol impuesta por @AdminOnly() a nivel de clase.
 *
 * @example
 * \@Public()
 * \@Get()
 * findAll() { ... }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
