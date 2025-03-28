"use client"
import { useAppStore } from '@/lib/store/appStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAppStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await login(
      formData.get('email') as string,
      formData.get('password') as string
    );
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[71vh] flex items-center justify-center bg-black">
      <div className="w-full max-w-md px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">MechTrack</h1>
          <p className="text-gray-400">Machine Maintenance System</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Sign in to your account</h2>
          
          <div className="space-y-5">
            <Input 
              name="email" 
              type="email" 
              placeholder="Email address" 
              className="bg-gray-0 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-500"
              required 
            />
            <Input
              name="password" 
              type="password" 
              placeholder="Password" 
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 focus:ring-1 focus:ring-gray-500"
              required 
            />
            
            <Button 
              type="submit" 
              className="w-full bg-gray-300 text-black hover:bg-gray-400 font-medium py-3 rounded-lg transition-all duration-200"
            >
              Continue
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link 
              href="/signup" 
              className="font-medium text-white hover:text-gray-300 transition-colors"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}