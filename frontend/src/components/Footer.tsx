'use client';
import { motion } from 'framer-motion';
import { Github, Star, FileText, Users, Scale } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const githubRepo = "https://github.com/sarthaktex/machinedash";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="border-t border-gray-200 bg-white/95 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Documentation */}
          <FooterSection 
            title="DOCUMENTATION" 
            icon={<FileText className="h-4 w-4" />}
            links={[
              { href: "/docs", text: "Getting Started" },
              { href: "/api-reference", text: "API Reference" },
              { href: "/tutorials", text: "Video Tutorials" }
            ]}
          />

          {/* Community */}
          <FooterSection 
            title="COMMUNITY" 
            icon={<Users className="h-4 w-4" />}
            links={[
              { href: githubRepo, text: "GitHub", icon: <Github className="h-4 w-4" /> },
              { href: `${githubRepo}/discussions`, text: "Discussions" },
              { href: `${githubRepo}/blob/main/CONTRIBUTING.md`, text: "Contributing" }
            ]}
          />

          {/* Legal */}
          <FooterSection 
            title="LEGAL" 
            icon={<Scale className="h-4 w-4" />}
            links={[
              { href: "/privacy", text: "Privacy Policy" },
              { href: "/terms", text: "Terms of Service" },
              { href: "/license", text: "MIT License" }
            ]}
          />

          {/* GitHub Star */}
          <div className="flex flex-col">
            <motion.a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg transition-all w-fit"
            >
              <Star className="h-4 w-4" />
              Star on GitHub
              <span className="text-xs bg-gray-300 text-gray-800 px-2 py-1 rounded-full ml-2">
                1.2k
              </span>
            </motion.a>
            
            <div className="mt-6 space-y-2">
              <p className="text-xs text-gray-500">
                Version: v1.0.0-beta
              </p>
              <p className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {currentYear} MachineDash. Open-source under MIT License.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                href="https://github.com/sarthaktex"
                className="text-xs text-gray-600 hover:text-black flex items-center gap-1 transition-colors"
              >
                <span>Built by</span>
                <span className="font-medium">Sarthak</span>
                <Github className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

function FooterSection({ title, icon, links }: { 
  title: string; 
  icon?: React.ReactNode;
  links: { href: string; text: string; icon?: React.ReactNode }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
        {icon}
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li 
            key={index}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              {link.icon && <span>{link.icon}</span>}
              {link.text}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}