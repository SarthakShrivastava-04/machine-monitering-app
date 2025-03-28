'use client';
import { useAppStore } from '@/lib/store/appStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Edit, HardHat } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type MachineStatus = 'Operational' | 'Maintenance' | 'Idle' | 'Error';

interface FormData {
  name: string;
  machineId: string;
  status: MachineStatus;
  temperature: number;
  energyConsumption: number;
}

export default function MachineDetailsPage({ params }: { params: { id: string } }) {
  const { selectedMachine, fetchMachineById, updateMachine } = useAppStore();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    machineId: '',
    status: 'Operational',
    temperature: 0,
    energyConsumption: 0,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchMachineById(params.id);
  }, [params.id, fetchMachineById]);

  useEffect(() => {
    if (selectedMachine) {
      setFormData({
        name: selectedMachine.name,
        machineId: selectedMachine.machineId,
        status: selectedMachine.status as MachineStatus,
        temperature: selectedMachine.temperature,
        energyConsumption: selectedMachine.energyConsumption,
      });
    }
  }, [selectedMachine]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateMachine(params.id, {
        name: formData.name,
        machineId: formData.machineId,
        status: formData.status,
        temperature: Number(formData.temperature),
        energyConsumption: Number(formData.energyConsumption),
      });
      toast.success('Machine updated successfully');
      setIsEditOpen(false);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update machine');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!selectedMachine) {
    return (
      <div className="min-h-[71vh] container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading machine details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[71vh] container mx-auto py-8 px-4">
      <Button
        onClick={() => router.back()}
        className="mb-6 bg-gray-950 hover:bg-gray-950 text-gray-300 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
              <HardHat className="text-gray-300" />
              {selectedMachine.name}
            </h1>
            <p className="text-gray-400 mt-1">ID: {selectedMachine.machineId}</p>
          </div>
          <Button 
            onClick={() => setIsEditOpen(true)}
            className="bg-white text-black hover:bg-gray-200"
          >
            <Edit className="h-4 w-4 mr-2" />
            Update Machine
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Status</h3>
              <p className="mt-1 text-lg font-medium text-white">
                <span className={`inline-block h-3 w-3 rounded-full mr-2 ${
                  selectedMachine.status === 'Operational' ? 'bg-green-500' :
                  selectedMachine.status === 'Maintenance' ? 'bg-yellow-500' :
                  selectedMachine.status === 'Idle' ? 'bg-blue-500' : 'bg-red-500'
                }`}></span>
                {selectedMachine.status}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400">Temperature</h3>
              <p className={`mt-1 text-lg font-medium ${
                selectedMachine.temperature > 85 ? 'text-red-400' : 'text-white'
              }`}>
                {selectedMachine.temperature}°C
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Energy Consumption</h3>
              <p className={`mt-1 text-lg font-medium ${
                selectedMachine.energyConsumption > 450 ? 'text-yellow-400' : 'text-white'
              }`}>
                {selectedMachine.energyConsumption} kWh
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Update Machine Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300" htmlFor="name">Machine Name</Label>
              <Input
                id="name"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <Label className="text-gray-300" htmlFor="machineId">Machine ID</Label>
              <Input
                id="machineId"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.machineId}
                onChange={(e) => setFormData({...formData, machineId: e.target.value})}
              />
            </div>

            <div>
              <Label className="text-gray-300" htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({
                  ...formData, 
                  status: e.target.value as MachineStatus
                })}
                className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <option value="Operational">Operational</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Idle">Idle</option>
                <option value="Error">Error</option>
              </select>
            </div>

            <div>
              <Label className="text-gray-300" htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.temperature}
                onChange={(e) => setFormData({
                  ...formData, 
                  temperature: Number(e.target.value)
                })}
              />
            </div>

            <div>
              <Label className="text-gray-300" htmlFor="energy">Energy Consumption (kWh)</Label>
              <Input
                id="energy"
                type="number"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.energyConsumption}
                onChange={(e) => setFormData({
                  ...formData, 
                  energyConsumption: Number(e.target.value)
                })}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                onClick={handleUpdate} 
                disabled={isUpdating}
                className="bg-white text-black hover:bg-gray-200"
              >
                {isUpdating ? 'Updating...' : 'Update Machine'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}