import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MachinesService {
  async getAllMachines() {
    return prisma.machine.findMany();
  }

  async getMachineById(id: string) {
    return prisma.machine.findUnique({ where: { id } });
  }

  async updateMachine(id: string, data: any) {
    return prisma.machine.update({ where: { id }, data });
  }
}
