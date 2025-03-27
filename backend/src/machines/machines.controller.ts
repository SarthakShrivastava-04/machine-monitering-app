import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MachinesService } from './machines.service';

@Controller('machines')
export class MachinesController {
  constructor(private machinesService: MachinesService) {}

  @Get()
  getAllMachines() {
    return this.machinesService.getAllMachines();
  }

  @Get(':id')
  getMachineById(@Param('id') id: string) {
    return this.machinesService.getMachineById(id);
  }

  @Post(':id/update')
  updateMachine(@Param('id') id: string, @Body() data) {
    return this.machinesService.updateMachine(id, data);
  }
}
