import { CanActivate, ExecutionContext, mixin, Type } from "@nestjs/common";

export const RoleGuard = (...allowedRoles: string[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
 
    if (allowedRoles.length == 0) {
      return true;
    }
    const {user}=context.switchToHttp().getRequest();
    if (!user) {
        return false;
      }
    return allowedRoles.includes(user.userType);
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
}