'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white px-8 py-5 shadow-md border-b border-gray-200 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-indigo-600 tracking-tight">
        🧠 Memory Game
      </h1>
      <nav className="flex gap-4">
        <Link href="/" passHref>
          <Button variant="outline" className="hover:bg-indigo-50 hover:text-indigo-600 transition">
            Inici
          </Button>
        </Link>
        <Link href="/juego" passHref>
          <Button variant="outline" className="hover:bg-indigo-50 hover:text-indigo-600 transition">
            Joc
          </Button>
        </Link>
        <Link href="/acerca" passHref>
          <Button variant="outline" className="hover:bg-indigo-50 hover:text-indigo-600 transition">
            Acerca
          </Button>
        </Link>
      </nav>
    </header>
  );
}
