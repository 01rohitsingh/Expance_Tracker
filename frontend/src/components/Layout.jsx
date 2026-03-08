import { useState } from "react";
import { AnimatePresence } from "framer-motion";

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

          <div
            className="fixed inset-0 z-50 flex md:hidden"
          >

            <div
              className="w-64 bg-slate-900 shadow-2xl"
            >
              <Sidebar closeSidebar={() => setOpenSidebar(false)} />
            </div>


            <div
              className="flex-1 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenSidebar(false)}
            />

          </div>

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

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">

          <div className="max-w-7xl mx-auto">

            {children && typeof children === "object"
              ? children.type
                ? <children.type {...children.props} searchQuery={searchQuery} />
                : children
              : children}

          </div>

        </main>


        {/* Footer */}

        <Footer />

      </div>

    </div>

  );

}