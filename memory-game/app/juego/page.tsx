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
      <div className="mensaje-final">
        <h2>¡Felicidades por terminar la partida!</h2>
        <p>Tiempo restante: {tiempoRestante} segundos</p>
        <p>Puntuación: {puntuacion} pares encontrados</p>
        <p>Clicks realizados: {clicks}</p>
        <button onClick={reiniciarJuego}>Volver a jugar</button>
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
