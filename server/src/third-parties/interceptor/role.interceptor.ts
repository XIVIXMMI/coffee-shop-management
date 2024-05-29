import { SetMetadata } from '@nestjs/common';

export enum Role {
    Admin = 2,
    Staff = 1
}



export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);