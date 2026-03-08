import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (

    <div className="flex min-h-screen bg-slate-50 text-slate-800 overflow-hidden">

      {/* Desktop Sidebar */}

      <div className="hidden md:flex w-64 border-r border-slate-200 bg-slate-900">
        <Sidebar />
      </div>


      {/* Mobile Sidebar */}

      <AnimatePresence>

        {openSidebar && (

          <motion.div
            className="fixed inset-0 z-50 flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >

            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-64 bg-slate-900 shadow-2xl"

              whileTap={{ scale: 0.98 }}

              onTouchStart={(e)=>{
                e.currentTarget.style.transform="scale(0.98)";
              }}

              onTouchEnd={(e)=>{
                e.currentTarget.style.transform="scale(1)";
              }}
            >
              <Sidebar closeSidebar={() => setOpenSidebar(false)} />
            </motion.div>


            <motion.div
              className="flex-1 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}

              whileTap={{ opacity: 0.6 }}

              onTouchStart={(e)=>{
                e.currentTarget.style.opacity="0.6";
              }}

              onTouchEnd={(e)=>{
                e.currentTarget.style.opacity="1";
              }}

              onClick={() => setOpenSidebar(false)}
            />

          </motion.div>

        )}

      </AnimatePresence>


      {/* Main Content */}

      <div className="flex flex-col flex-1 min-w-0">

        {/* Navbar */}

        <Navbar
          setOpenSidebar={setOpenSidebar}
          setSearchQuery={setSearchQuery}
        />


        {/* Page Content */}

        <motion.main
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}

          whileTap={{ scale: 0.995 }}

          onTouchStart={(e)=>{
            e.currentTarget.style.transform="scale(0.995)";
          }}

          onTouchEnd={(e)=>{
            e.currentTarget.style.transform="scale(1)";
          }}
        >

          <div className="max-w-7xl mx-auto">

            {children && typeof children === "object"
              ? children.type
                ? <children.type {...children.props} searchQuery={searchQuery} />
                : children
              : children}

          </div>

        </motion.main>


        {/* Footer */}

        <Footer />

      </div>

    </div>

  );

}