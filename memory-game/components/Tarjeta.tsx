'use client'

import { useState } from 'react';
import { useClickContext } from './ClickContext'; // ajusta ruta según estructura
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface TarjetaProps {
  nombre: string;
  imagen: string;
}

export function Tarjeta({ nombre, imagen }: TarjetaProps) {
  const [clicks, setClicks] = useState(0);
  const { increment } = useClickContext();

  function handleClick() {
    setClicks((prev) => prev + 1);
    increment();
  }

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer hover:shadow-lg transition-shadow"
      role="button"
      tabIndex={0}
      aria-label={`Tarjeta de ${nombre}, clicado ${clicks} veces`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <CardContent className="flex flex-col items-center p-4">
        <div className="relative w-24 h-24 mb-2">
          <Image src={imagen} alt={nombre} fill className="object-contain" />
        </div>
        <p className="text-center font-medium">{nombre}</p>
        <p className="mt-2 text-sm text-gray-500">Clicks: {clicks}</p>
      </CardContent>
    </Card>
  );
}
