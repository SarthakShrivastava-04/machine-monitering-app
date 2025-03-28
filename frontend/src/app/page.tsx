'use client';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Toaster } from "@/components/ui/sonner"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-white text-black text-sm font-medium"
            >
              <span className="mr-2">🚀</span> Now Live!
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white">
                Industrial Machines
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100">
                At Your Fingertips
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Monitor, analyze and optimize your industrial equipment with real-time 
              dashboards and predictive maintenance alerts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }}>
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-200 px-8 gap-2"
                  asChild
                >
                  <Link href="/dashboard">
                    <BarChart2 className="h-5 w-5" />
                    Go to Dashboard
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.03 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-gray-400 text-white hover:bg-gray-900 px-8 gap-2"
                  asChild
                >
                  <Link href="/login">
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-16 pt-6 border-t border-gray-800 flex flex-wrap justify-center gap-6 text-gray-400"
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-sm">Monitoring</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">99.9%</p>
                <p className="text-sm">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-sm">Parameters Tracked</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <Toaster/>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-2">Explore More</p>
            <ArrowRight className="h-5 w-5 text-gray-400 rotate-90" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}