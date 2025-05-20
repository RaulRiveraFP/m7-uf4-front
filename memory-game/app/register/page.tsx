'use client';

import { useState } from 'react';
import { registrarUsuario } from '../../lib/users';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    const registrado = registrarUsuario({ username, password });
    if (!registrado) {
      setError('El usuario ya existe');
      return;
    }
    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <label className="block mb-2 font-semibold" htmlFor="username">
          Usuario
        </label>
        <input
          id="username"
          type="text"
          className="w-full border border-gray-300 p-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block mb-2 font-semibold" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="w-full border border-gray-300 p-2 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
