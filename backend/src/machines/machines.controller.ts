import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MachinesService } from './machines.service';

@Controller('machines')
export class MachinesController {
  constructor(private machinesService: MachinesService) {}

  @Get()
  getAllMachines() {
    return this.machinesService.getAllMachines();
  }

  @Get(':machineId')
  getMachineById(@Param('machineId') machineId: string) {
    return this.machinesService.getMachineById(machineId);
  }

  @Post(':machineId/update')
  updateMachine(@Param('machineId') machineId: string, @Body() data) {
    return this.machinesService.updateMachine(machineId, data);
  }
}
