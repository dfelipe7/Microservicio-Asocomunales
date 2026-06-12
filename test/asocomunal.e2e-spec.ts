/**
 * Pruebas de Integración — AsocomunalController
 *
 * Verifican la integración entre el sistema de rutas HTTP de NestJS,
 * el guard de autenticación (JwtCookieGuard) y el controlador
 * (AsocomunalController), sin necesidad de una base de datos real ni
 * de un servidor Keycloak activo.
 *
 * Estrategia:
 *  - Se crea un módulo de prueba ligero solo con el controlador y mocks.
 *  - El JwtCookieGuard real se sobreescribe con overrideGuard() para evitar
 *    que NestJS intente resolver JwtService y KeycloakKeyService.
 *  - El guard de prueba respeta @Public() y rechaza con 401 si no hay token.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AsocomunalController } from '../src/asocomunal/capaControladores/asocomunal.controller';
import { AsocomunalService } from '../src/asocomunal/fachadaService/asocomunal.service';
import { JwtCookieGuard } from '../src/auth/guards/jwt-cookie.guard';
import { IS_PUBLIC_KEY } from '../src/auth/decorators/public.decorator';
import { ROLES_KEY } from '../src/auth/decorators/allow-roles.decorator';

// ─── Mock del AsocomunalService ─────────────────────────────────────────────

const mockAsocomunal = {
  id: 1,
  nombre: 'Asocomunal Test',
  estado: 'Activa',
  municipio: { id: 1, nombre: 'Bogotá' },
  presidente: 'Juan Pérez',
  telefono: '3001234567',
  correo: 'test@asocomunal.com',
  jacs: [],
};

const mockAsocomunalService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findAllPublic: jest.fn(),
  findOnePublic: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  activate: jest.fn(),
  getAsocomunalWithJacs: jest.fn(),
};

// ─── Guard simplificado para pruebas ────────────────────────────────────────

@Injectable()
class TestJwtGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<{ headers: { authorization?: string } }>();
    if (!req.headers.authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de autenticación no proporcionado');
    }

    const allowedRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) ?? ['admin'];
    (req as any).user = { sub: 'test-user', rol: allowedRoles[0] ?? 'admin' };
    return true;
  }
}

// ─── Suite de integración ────────────────────────────────────────────────────

describe('AsocomunalController (Integration)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AsocomunalController],
      providers: [
        { provide: AsocomunalService, useValue: mockAsocomunalService },
        Reflector,
      ],
    })
      .overrideGuard(JwtCookieGuard)
      .useClass(TestJwtGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ── Endpoints públicos ──────────────────────────────────────────────────

  describe('GET /asocomunal/public (público, sin autenticación)', () => {
    it('debe retornar 200 y la lista pública de asocomunales', async () => {
      mockAsocomunalService.findAllPublic.mockResolvedValue([
        { id: 1, nombre: 'Asocomunal Test', estado: 'Activa', municipio: 'Bogotá' },
      ]);

      const res = await request(app.getHttpServer())
        .get('/asocomunal/public')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(mockAsocomunalService.findAllPublic).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /asocomunal/public/:id (público, sin autenticación)', () => {
    it('debe retornar 200 con la asocomunal pública solicitada', async () => {
      mockAsocomunalService.findOnePublic.mockResolvedValue({
        id: 1, nombre: 'Asocomunal Test', estado: 'Activa', municipio: 'Bogotá',
      });

      const res = await request(app.getHttpServer())
        .get('/asocomunal/public/1')
        .expect(200);

      expect(res.body).toHaveProperty('id', 1);
      expect(mockAsocomunalService.findOnePublic).toHaveBeenCalledTimes(1);
    });
  });

  // ── Endpoints protegidos sin token → deben retornar 401 ────────────────

  describe('Endpoints protegidos sin token', () => {
    it('GET /asocomunal → 401 sin Authorization', () =>
      request(app.getHttpServer()).get('/asocomunal').expect(401));

    it('GET /asocomunal/:id → 401 sin Authorization', () =>
      request(app.getHttpServer()).get('/asocomunal/1').expect(401));

    it('GET /asocomunal/:id/jacs → 401 sin Authorization', () =>
      request(app.getHttpServer()).get('/asocomunal/1/jacs').expect(401));

    it('POST /asocomunal → 401 sin Authorization', () =>
      request(app.getHttpServer()).post('/asocomunal').send({ nombre: 'Nueva' }).expect(401));

    it('PATCH /asocomunal/:id → 401 sin Authorization', () =>
      request(app.getHttpServer()).patch('/asocomunal/1').send({ nombre: 'X' }).expect(401));

    it('DELETE /asocomunal/:id → 401 sin Authorization', () =>
      request(app.getHttpServer()).delete('/asocomunal/1').expect(401));

    it('PATCH /asocomunal/:id/activate → 401 sin Authorization', () =>
      request(app.getHttpServer()).patch('/asocomunal/1/activate').expect(401));
  });

  // ── Endpoints protegidos con token válido (mock) ────────────────────────

  describe('Endpoints protegidos con token de prueba', () => {
    const auth = 'Bearer test-token-valido';

    it('GET /asocomunal → 200 con token', async () => {
      mockAsocomunalService.findAll.mockResolvedValueOnce([mockAsocomunal]);
      const res = await request(app.getHttpServer()).get('/asocomunal').set('Authorization', auth).expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /asocomunal/:id → 200 con token', async () => {
      mockAsocomunalService.findOne.mockResolvedValueOnce(mockAsocomunal);
      const res = await request(app.getHttpServer()).get('/asocomunal/1').set('Authorization', auth).expect(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('GET /asocomunal/:id/jacs → 200 con token', async () => {
      mockAsocomunalService.getAsocomunalWithJacs.mockResolvedValueOnce(mockAsocomunal);
      await request(app.getHttpServer()).get('/asocomunal/1/jacs').set('Authorization', auth).expect(200);
      expect(mockAsocomunalService.getAsocomunalWithJacs).toHaveBeenCalledTimes(1);
    });

    it('POST /asocomunal → 201 al crear con token', async () => {
      mockAsocomunalService.create.mockResolvedValueOnce(mockAsocomunal);
      const res = await request(app.getHttpServer()).post('/asocomunal').set('Authorization', auth)
        .send({ nombre: 'Nueva Asocomunal', municipioId: 1 }).expect(201);
      expect(res.body).toHaveProperty('id');
    });

    it('PATCH /asocomunal/:id → 200 al actualizar con token', async () => {
      mockAsocomunalService.update.mockResolvedValueOnce({ ...mockAsocomunal, nombre: 'Editada' });
      const res = await request(app.getHttpServer()).patch('/asocomunal/1').set('Authorization', auth)
        .send({ nombre: 'Editada' }).expect(200);
      expect(res.body).toHaveProperty('nombre', 'Editada');
    });

    it('PATCH /asocomunal/:id/activate → 200 al activar con token', async () => {
      mockAsocomunalService.activate.mockResolvedValueOnce(mockAsocomunal);
      await request(app.getHttpServer()).patch('/asocomunal/1/activate').set('Authorization', auth).expect(200);
      expect(mockAsocomunalService.activate).toHaveBeenCalledTimes(1);
    });

    it('DELETE /asocomunal/:id → 200 al eliminar con token', async () => {
      mockAsocomunalService.remove.mockResolvedValueOnce(mockAsocomunal);
      await request(app.getHttpServer()).delete('/asocomunal/1').set('Authorization', auth).expect(200);
      expect(mockAsocomunalService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
