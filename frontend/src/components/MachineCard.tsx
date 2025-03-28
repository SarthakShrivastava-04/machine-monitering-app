// components/machines/MachineCard.tsx
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
    Operational: 'bg-green-100 text-green-800',
    Maintenance: 'bg-yellow-100 text-yellow-800',
    Idle: 'bg-blue-100 text-blue-800',
    Error: 'bg-red-100 text-red-800'
  };

  const temperatureStatus = machine.temperature > 85 ? 'text-red-500' : 'text-gray-700';
  const energyStatus = machine.energyConsumption > 450 ? 'text-yellow-500' : 'text-gray-700';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{machine.name}</h3>
            <p className="text-sm text-gray-500">ID: {machine.machineId}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[machine.status]}`}>
            {machine.status}
          </span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex items-center">
            <Thermometer className={`h-5 w-5 mr-2 ${temperatureStatus}`} />
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className={`font-medium ${temperatureStatus}`}>
                {machine.temperature}°C
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Zap className={`h-5 w-5 mr-2 ${energyStatus}`} />
            <div>
              <p className="text-sm text-gray-500">Energy</p>
              <p className={`font-medium ${energyStatus}`}>
                {machine.energyConsumption} kWh
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Gauge className="h-4 w-4 mr-1" />
            <span>Last updated: Just now</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => router.push(`/machines/${machine.id}`)}
          >
            <Power className="h-4 w-4" />
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}