'use client';
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store/appStore";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAppStore();

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 py-3 flex items-center">
        {/* Left: Logo */}
        <motion.div 
          whileHover={{ rotate: -5 }}
          className="text-xl font-bold cursor-pointer flex items-center mr-auto"
          onClick={() => router.push('/')}
        >
          <span className="bg-black text-white px-2 py-1 rounded mr-1">M</span>
          <span className="hidden sm:inline">ACHINEDASH</span>
        </motion.div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-1 mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
            onClick={() => router.push('/')}
          >
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </motion.button>
        </nav>

        {/* Right: User Controls */}
        <div className=" min-w-2/7">
        {user && (
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm font-medium text-gray-800">
              {user.username}
            </span>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-black hover:bg-gray-100"
                onClick={logout}
              >
                Logout
              </Button>
            </motion.div>
          </div>
        )}
        </div>
      
      </div>
    </header>
  );
}