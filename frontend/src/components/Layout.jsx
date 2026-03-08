import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (

    <div className="flex min-h-screen bg-slate-50 text-slate-800 text-[17px] md:text-[18px] lg:text-[19px] rounded-2xl overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 border-r border-slate-200 bg-slate-900">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {openSidebar && (
          <div className="fixed inset-0 z-50 flex md:hidden">

            <div className="w-64 bg-slate-900 shadow-2xl">
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

        <Navbar
          setOpenSidebar={setOpenSidebar}
          setSearchQuery={setSearchQuery}
        />

        <main className="flex-1 p-8 md:p-10 lg:p-12 overflow-y-auto">

          <div className="w-full max-w-[1700px] mx-auto">

            {children && typeof children === "object"
              ? children.type
                ? <children.type {...children.props} searchQuery={searchQuery} />
                : children
              : children}

          </div>

        </main>

        <Footer />

      </div>

    </div>

  );
}