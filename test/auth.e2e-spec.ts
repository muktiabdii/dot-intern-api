import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

// increase timeout for app bootstrap
jest.setTimeout(30000);

describe('Auth & Protected Routes (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  }, 30000);

  afterAll(async () => {
    if (app) await app.close();
  });

  it('Should login successfully and return an access token', async () => {
    const email = `e2e_${Date.now()}@example.com`;
    const password = 'password123';

    // Register user first
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'e2e user', email, password })
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201);

    expect(loginRes.body).toBeDefined();
    expect(loginRes.body.accessToken).toBeDefined();
  });

  it('Should return 401 when accessing protected endpoint without token', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .expect(401);
  });

  it('Should return 401 when accessing protected endpoint with invalid token', async () => {
    await request(app.getHttpServer())
      .get('/events')
      .set('Authorization', 'Bearer invalid.token.here')
      .expect(401);
  });

  it('Should allow access to protected endpoint with valid token', async () => {
    const email = `e2e_${Date.now()}@example.com`;
    const password = 'password123';

    // Register and login user
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ name: 'e2e user 2', email, password })
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201);

    const token = loginRes.body.accessToken;

    await request(app.getHttpServer())
      .get('/events')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
