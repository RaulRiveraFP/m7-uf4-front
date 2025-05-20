'use client'

import { Card, CardContent } from "@/components/ui/card"; // asumiendo shadcn/ui cards
import Image from "next/image";

interface TarjetaProps {
  nombre: string;
  imagen: string;
  onClick?: () => void;
}

export function Tarjeta({ nombre, imagen, onClick }: TarjetaProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition-shadow"
      role="button"
      tabIndex={0}
      aria-label={`Tarjeta de ${nombre}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      <CardContent className="flex flex-col items-center p-4">
        <div className="relative w-24 h-24 mb-2">
          <Image src={imagen} alt={nombre} fill className="object-contain" />
        </div>
        <p className="text-center font-medium">{nombre}</p>
      </CardContent>
    </Card>
  );
}
