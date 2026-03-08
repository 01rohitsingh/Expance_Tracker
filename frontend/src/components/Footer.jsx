import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">

      {/* Top gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-slate-800 tracking-wide">
              FinTrack
            </h2>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Smart expense tracking dashboard built with modern web
              technologies to manage your finances easily.
            </p>
          </motion.div>


          {/* Navigation Links */}
          <motion.div
            className="flex flex-col md:items-center text-sm text-slate-600 space-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link to="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>

            <Link to="/wallets" className="hover:text-blue-600 transition">
              Wallets
            </Link>

            <Link to="/analytics" className="hover:text-blue-600 transition">
              Analytics
            </Link>

            <Link to="/settings" className="hover:text-blue-600 transition">
              Settings
            </Link>
          </motion.div>


          {/* Social Icons */}
          <motion.div
            className="flex md:justify-end gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <motion.a
              href="https://github.com/01rohitsingh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition active:scale-90"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
            >
              <Github size={22}/>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/01rohitsingh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition active:scale-90"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
            >
              <Linkedin size={22}/>
            </motion.a>

            <motion.a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition active:scale-90"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
            >
              <Mail size={22}/>
            </motion.a>

          </motion.div>

        </div>


        {/* Bottom Text */}
        <motion.div
          className="border-t border-slate-200 mt-8 pt-4 text-center text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          © {new Date().getFullYear()}
          <span className="font-semibold text-slate-700 ml-1">
            FinTrack
          </span>
          • Built with React & Node
        </motion.div>

      </div>

    </footer>
  );
}