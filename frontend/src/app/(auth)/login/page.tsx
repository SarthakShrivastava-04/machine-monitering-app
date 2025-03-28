"use client" 
import { useAppStore } from '@/lib/store/appStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-sm border w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Input name="email" type="email" placeholder="Email" className="mb-4" required />
        <Input name="password" type="password" placeholder="Password" className="mb-6" required />
        <Button type="submit" className="w-full bg-black hover:bg-gray-800">
          Sign In
        </Button>
      </form>
    </div>
  );
}