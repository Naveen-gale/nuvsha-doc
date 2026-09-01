import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-300 font-sans">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col md:ml-72 lg:pl-8">
        <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          {children}
        </div>
      </main>
    </div>
  );
};
