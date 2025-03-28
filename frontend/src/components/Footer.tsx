'use client';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const githubRepo = "https://github.com/SarthakShrivastava-04/machine-monitering-app";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t border-gray-800 bg-gray-950"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <Link 
              href="/docs" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Documentation
            </Link>
            <Link 
              href={githubRepo} 
              target="_blank"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-400">
              © {currentYear} MechTrack
            </p>
            <span className="text-gray-600">|</span>
            <Link 
              href="https://github.com/SarthakShrivastava-04"
              target="_blank"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span>By Sarthak</span>
              <Github className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}