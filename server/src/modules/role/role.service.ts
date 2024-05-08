import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';


@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) { }

  async createRole(createRoleDto: CreateRoleDto) {
    const { role_name } = createRoleDto;
    const newRole = await this.prisma.role.create({
      data: {
        role_name
      },
    });

    return newRole;
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: {
        role_id: id
      }
    });
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { role_id: id },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    const role = await this.prisma.role.findUnique({ where: { role_id: id } });
    if (!role) {
      throw new ErrorCustom(ERROR_RESPONSE.RoleIsNotExisted)
    }
    const deletedRole = await this.prisma.role.delete({ where: { role_id: id } });
    return deletedRole;
  }
}
