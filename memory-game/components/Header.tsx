'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white px-8 py-5 shadow-md border-b border-gray-200 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-indigo-600 tracking-tight">
        🧠 Memory Game
      </h1>
      <nav className="flex gap-4">
        <Button
          variant="outline"
          className="hover:bg-indigo-50 hover:text-indigo-600 transition"
          onClick={() => router.push('/')}
        >
          Inici
        </Button>
        <Button
          variant="outline"
          className="hover:bg-indigo-50 hover:text-indigo-600 transition"
          onClick={() => router.push('/juego')}
        >
          Joc
        </Button>
        <Button
          variant="outline"
          className="hover:bg-indigo-50 hover:text-indigo-600 transition"
          onClick={() => router.push('/acerca')}
        >
          Acerca
        </Button>
      </nav>
    </header>
  );
}
