'use client';

import { JuegoProvider } from '../context/JuegoContext';
import GrupoTarjetas from "../../components/GrupoTarjetas"
import { useJuegoContext } from '../context/JuegoContext';

function JuegoContent() {
  const { puntuacion, tiempoRestante, juegoTerminado, reiniciarJuego, clicks } = useJuegoContext();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl mb-4 font-semibold text-center">
      Temps restant: {tiempoRestante}s | Puntuació: {puntuacion} | Clicks: {clicks}
      </h2>

      {juegoTerminado ? (
        <>
          <p className="text-center text-red-500 text-lg font-bold">Temps esgotat! 🎮</p>
          <div className="flex justify-center mt-6">
            <button
              onClick={reiniciarJuego}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Tornar a jugar
            </button>
          </div>
        </>
      ) : (
        <GrupoTarjetas />
      )}
    </main>
  );
}

export default function JuegoPage() {
  return (
    <JuegoProvider>
      <JuegoContent />
    </JuegoProvider>
  );
}
