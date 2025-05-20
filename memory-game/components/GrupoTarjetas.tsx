'use client'

import { Tarjeta } from "./Tarjeta";

interface Item {
  nombre: string;
  imagen: string;
}

interface GrupoTarjetasProps {
  items: Item[];
  onCardClick?: (index: number) => void;
}

export function GrupoTarjetas({ items, onCardClick }: GrupoTarjetasProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item, index) => (
        <Tarjeta
          key={index}
          nombre={item.nombre}
          imagen={item.imagen}
          onClick={() => onCardClick?.(index)}
        />
      ))}
    </div>
  );
}
