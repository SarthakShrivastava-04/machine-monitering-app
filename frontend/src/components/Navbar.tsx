'use client';
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store/appStore";

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAppStore();

  return (
    <header className="border-b border-gray-700 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 py-3 flex items-center">
        {/* Left: Logo */}
        <motion.div 
          whileHover={{ rotate: -5 }}
          className="text-xl font-bold cursor-pointer flex items-center mr-auto"
          onClick={() => router.push('/')}
        >
          <span className="bg-white text-black px-2 py-1 rounded mr-1">M</span>
          <span className="hidden sm:inline text-white">ECHTRACK</span>
        </motion.div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-1 mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-white hover:bg-gray-800"
            onClick={() => router.push('/')}
          >
            Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all text-white hover:bg-gray-800"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </motion.button>
        </nav>

        {/* Right: User Controls */}
        <div className="min-w-1/7 ml-auto">
          {user && (
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm font-medium text-gray-300">
                {user.username}
              </span>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  className="text-gray-900 bg-gray-200 hover:text-gray-950 hover:bg-gray-300"
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