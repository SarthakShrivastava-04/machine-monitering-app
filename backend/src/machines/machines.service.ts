import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class MachinesService {
  async getAllMachines() {
    return prisma.machine.findMany();
  }

  async getMachineById(machineId: string) {
    return prisma.machine.findUnique({ where: { machineId } });
  }

  async updateMachine(machineId: string, data: any) {
    return prisma.machine.update({ where: { machineId }, data });
  }
}
