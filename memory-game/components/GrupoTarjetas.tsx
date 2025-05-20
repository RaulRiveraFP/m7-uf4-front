'use client';

import { Tarjeta } from "./Tarjeta";
import { useJuegoContext } from "../app/context/JuegoContext";

export default function GrupoTarjetas() {
  const { cartas, seleccionarCarta, cartaVolteada, cartaEmparejada } = useJuegoContext();

  return (
    <div className="grid grid-cols-3 gap-4">
      {cartas.map((carta) => (
        <Tarjeta
          key={carta.id}
          nombre={carta.nombre}
          imagen={carta.imagen}
          estaVolteada={cartaVolteada(carta.id)}
          estaEmparejada={cartaEmparejada(carta.id)}
          onClick={() => seleccionarCarta(carta.id)}
        />
      ))}
    </div>
  );
}
