import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (

    <div className="flex min-h-screen bg-slate-50 text-slate-800">

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
          >

            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25 }}
              className="w-64 bg-slate-900 shadow-2xl"
            >
              <Sidebar closeSidebar={() => setOpenSidebar(false)} />
            </motion.div>

            <div
              className="flex-1 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenSidebar(false)}
            />

          </motion.div>

        )}

      </AnimatePresence>

      {/* Main Content */}

      <div className="flex flex-col flex-1">

        <Navbar setOpenSidebar={setOpenSidebar} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">

          <div className="max-w-7xl mx-auto">
            {children}
          </div>

        </main>

        <Footer />

      </div>



    </div>

  );

}