import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const expiresRaw = config.get<string>('JWT_EXPIRES_IN');
        // if expiresRaw is purely numeric, treat it as number, otherwise keep string (e.g. '1d')
        const expires = expiresRaw && /^\d+$/.test(expiresRaw) ? Number(expiresRaw) : expiresRaw || '1d';
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            // `expiresIn` in the upstream types can be unioned with narrower types; cast as any to satisfy assignment while keeping runtime behavior intact
            expiresIn: expires as any,
          },
        } as JwtModuleOptions;
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
