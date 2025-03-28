'use client';
import { motion } from 'framer-motion';
import { Gauge, Zap, Thermometer, Power } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

type MachineCardProps = {
  machine: {
    id: string;
    machineId: string;
    name: string;
    status: 'Operational' | 'Maintenance' | 'Idle' | 'Error';
    temperature: number;
    energyConsumption: number;
  };
};

export function MachineCard({ machine }: MachineCardProps) {
  const router = useRouter();
  
  const statusColors = {
    Operational: 'bg-green-900/20 text-green-400 border-green-800',
    Maintenance: 'bg-yellow-900/20 text-yellow-400 border-yellow-800',
    Idle: 'bg-blue-900/20 text-blue-400 border-blue-800',
    Error: 'bg-red-900/20 text-red-400 border-red-800'
  };

  const temperatureStatus = machine.temperature >= 80 ? 'text-red-400' : 'text-gray-300';
  const energyStatus = machine.energyConsumption >= 400 ? 'text-yellow-400' : 'text-gray-300';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="border border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-gray-900 hover:bg-gray-800/50 cursor-pointer"
      onClick={() =>  router.push(`/machines/${machine.machineId}`)}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{machine.name}</h3>
            <p className="text-sm text-gray-400">ID: {machine.machineId}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[machine.status]}`}>
            {machine.status}
          </span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex items-center">
            <Thermometer className={`h-5 w-5 mr-2 ${temperatureStatus}`} />
            <div>
              <p className="text-sm text-gray-400">Temperature</p>
              <p className={`font-medium ${temperatureStatus}`}>
                {machine.temperature}°C
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Zap className={`h-5 w-5 mr-2 ${energyStatus}`} />
            <div>
              <p className="text-sm text-gray-400">Energy</p>
              <p className={`font-medium ${energyStatus}`}>
                {machine.energyConsumption} kWh
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-gray-800 pt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Gauge className="h-4 w-4 mr-1" />
            <span>Last updated: Just now</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-gray-800 border-gray-700 hover:bg-gray-300 hover:text-gray-900"
          >
            <Power className="h-4 w-4" />
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}