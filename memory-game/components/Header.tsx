'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const STORAGE_LOGGED_KEY = 'usuario_logueado';

export default function Header() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(STORAGE_LOGGED_KEY);
      setUsuario(user);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem(STORAGE_LOGGED_KEY);
    setUsuario(null);
    router.push('/login');
  };

  return (
    <header className="bg-white px-8 py-5 shadow-md border-b border-gray-200 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-indigo-600 tracking-tight cursor-pointer" onClick={() => router.push('/')}>
        🧠 Memory Game
      </h1>
      <nav className="flex gap-4 items-center">
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

        {!usuario ? (
          <>
            <Button
              variant="outline"
              className="hover:bg-indigo-50 hover:text-indigo-600 transition"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="hover:bg-indigo-50 hover:text-indigo-600 transition"
              onClick={() => router.push('/register')}
            >
              Registro
            </Button>
          </>
        ) : (
          <>
            <span className="text-indigo-600 font-medium">{usuario}</span>
            <Button
              variant="outline"
              className="hover:bg-red-100 hover:text-red-600 transition"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
