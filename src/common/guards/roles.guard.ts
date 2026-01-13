import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      string[] | undefined
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    if (!req || typeof req !== 'object') return false;
    const user = (req as { user?: { role?: string } }).user;
    if (!user || !user.role) return false;

    // allow case-insensitive matching
    const userRole = user.role.toString().toUpperCase();
    return requiredRoles.map((r) => r.toUpperCase()).includes(userRole);
  }
}
