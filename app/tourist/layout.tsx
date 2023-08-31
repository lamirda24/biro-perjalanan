'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { Button, Toaster } from '@/components/ui';
import { Sidebar } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="border-b md:w-full h-20 flex items-center justify-start md:flex px-[20px]">
        <h1>Tourlist List - Luthfi AM</h1>
      </header>
      <div className="flex-1 flex flex-col md:flex-row  h-screen">
        <aside className="border-b md:border-r border-secondary flex flex- justify-start items-start relative md:h-full">
          <div className="flex flex-col sticky top-[65px] md:w-[240px] p-4">
            <Link
              href="/tourist"
              className="hover:bg-gray-800 rounded-md hover:text-[#eee] transition-all duration-300 h-[40px] flex items-center justify-start px-4"
            >
              <p>Tourist List</p>
            </Link>
          </div>
        </aside>

        <div className="container">
          <div className="flex-1 py-8">{children}</div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
