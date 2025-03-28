"use client";
import { useAppStore } from "@/lib/store/appStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MachineCard } from "@/components/MachineCard";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const {
    user,
    machines,
    fetchAllMachines,
    machinesLoading,
    machinesError
  } = useAppStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set hydrated when store is ready
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only run after store is hydrated
    if (!isHydrated) return;
    
    if (!user) {
      router.push("/login");
      return;
    }
    
    if (machines.length === 0 && !machinesLoading) {
      fetchAllMachines();
    }
  }, [user, machines.length, machinesLoading, router, fetchAllMachines, isHydrated]);

  // Show loading state while store hydrates
  if (!isHydrated) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-400">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  if (machinesLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading machines...</div>
        </div>
      </div>
    );
  }

  if (machinesError) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded">
          {machinesError}
          <Button 
            onClick={fetchAllMachines}
            variant="outline"
            className="mt-2 text-white border-gray-700 hover:bg-gray-800"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div>
          <p className="text-gray-200 text-2xl md:text-3xl font-bold">
            {machines.length} machine{machines.length !== 1 ? 's' : ''} registered
          </p>
        </div>
      </div>

      {machines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {machines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg p-8 text-center border border-gray-800">
          <h3 className="text-lg font-medium text-white mb-2">
            No machines found
          </h3>
          <p className="text-gray-400 mb-4">
            Your machines will appear here once added
          </p>
        </div>
      )}
    </div>
  );
}