"use client";
import { useAppStore } from "@/lib/store/appStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MachineCard } from "@/components/MachineCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const {
    user,
    machines,
    fetchAllMachines,
    machinesLoading,
    machinesError,
    initializeFromStorage
  } = useAppStore();

  const router = useRouter();

  useEffect(() => {
    // initializeFromStorage();
    if (!user) {
      router.push("/login");
      return;
    }
    
    fetchAllMachines();
  }, [user, fetchAllMachines, router]);

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  if (machinesLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-500">Loading machines...</div>
        </div>
      </div>
    );
  }

  if (machinesError) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {machinesError}
          <Button 
            onClick={fetchAllMachines}
            variant="outline"
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome, {user.username}
          </h1>
          <p className="text-gray-600 mt-1">
            {machines.length} machine{machines.length !== 1 ? 's' : ''} currently registered
          </p>
        </div>
        <Button onClick={() => router.push("/machines/add")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Machine
        </Button>
      </div>

      {machines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No machines found
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first machine
          </p>
          <Button onClick={() => router.push("/machines/add")}>
            <Plus className="h-4 w-4 mr-2" />
            Add Machine
          </Button>
        </div>
      )}
    </div>
  );
}