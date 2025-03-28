'use client';
import { useAppStore } from '@/lib/store/appStore';
import { useEffect, useState, use } from 'react';
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

export default function MachineDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
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
    fetchMachineById(resolvedParams.id);
  }, [resolvedParams.id, fetchMachineById]);

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
      await updateMachine(resolvedParams.id, {
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
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-500">Loading machine details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <HardHat className="text-gray-700" />
              {selectedMachine.name}
            </h1>
            <p className="text-gray-600 mt-1">ID: {selectedMachine.machineId}</p>
          </div>
          <Button onClick={() => setIsEditOpen(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Update Machine
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1 text-lg font-medium">
                <span className={`inline-block h-3 w-3 rounded-full mr-2 ${
                  selectedMachine.status === 'Operational' ? 'bg-green-500' :
                  selectedMachine.status === 'Maintenance' ? 'bg-yellow-500' :
                  selectedMachine.status === 'Idle' ? 'bg-blue-500' : 'bg-red-500'
                }`}></span>
                {selectedMachine.status}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Temperature</h3>
              <p className={`mt-1 text-lg font-medium ${
                selectedMachine.temperature > 85 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {selectedMachine.temperature}°C
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Energy Consumption</h3>
              <p className={`mt-1 text-lg font-medium ${
                selectedMachine.energyConsumption > 450 ? 'text-yellow-600' : 'text-gray-900'
              }`}>
                {selectedMachine.energyConsumption} kWh
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Machine Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Machine Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="machineId">Machine ID</Label>
              <Input
                id="machineId"
                value={formData.machineId}
                onChange={(e) => setFormData({...formData, machineId: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({
                  ...formData, 
                  status: e.target.value as MachineStatus
                })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="Operational">Operational</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Idle">Idle</option>
                <option value="Error">Error</option>
              </select>
            </div>

            <div>
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                value={formData.temperature}
                onChange={(e) => setFormData({
                  ...formData, 
                  temperature: Number(e.target.value)
                })}
              />
            </div>

            <div>
              <Label htmlFor="energy">Energy Consumption (kWh)</Label>
              <Input
                id="energy"
                type="number"
                value={formData.energyConsumption}
                onChange={(e) => setFormData({
                  ...formData, 
                  energyConsumption: Number(e.target.value)
                })}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update Machine'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}