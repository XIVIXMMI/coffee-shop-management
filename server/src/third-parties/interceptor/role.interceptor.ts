import { SetMetadata } from '@nestjs/common';

export enum Role {
    Admin = 1,
    Staff = 2
}



export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);