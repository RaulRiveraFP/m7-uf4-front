'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export interface Carta {
  id: number;
  nombre: string;
  imagen: string;
  emparejada: boolean;
  volteada: boolean;
}

export interface JuegoContextType {
  cartas: Carta[];
  seleccionarCarta: (id: number) => void;
  cartaVolteada: (id: number) => boolean;
  cartaEmparejada: (id: number) => boolean;
  reiniciarJuego: () => void;
  puntuacion: number;
  tiempoRestante: number;
  juegoTerminado: boolean;
  clicks: number;           // <-- Añadido clicks en la interfaz
}

const JuegoContext = createContext<JuegoContextType | undefined>(undefined);

export function useJuegoContext() {
  const context = useContext(JuegoContext);
  if (!context) throw new Error('useJuegoContext debe usarse dentro de JuegoProvider');
  return context;
}

interface Props {
  children: React.ReactNode;
}

const TIEMPO_INICIAL = 20; // segundos

export function JuegoProvider({ children }: Props) {
  // Ejemplo cartas fijas (deberías cargar las reales)
  const cartas: Carta[] = [
    { id: 0, nombre: 'Pikachu', imagen: '/pikachu.png', emparejada: false, volteada: false },
    { id: 1, nombre: 'Pikachu', imagen: '/pikachu.png', emparejada: false, volteada: false },
    { id: 2, nombre: 'Charmander', imagen: '/charmander.png', emparejada: false, volteada: false },
    { id: 3, nombre: 'Charmander', imagen: '/charmander.png', emparejada: false, volteada: false },
    { id: 4, nombre: 'Bulbasaur', imagen: '/bulbasaur.png', emparejada: false, volteada: false },
    { id: 5, nombre: 'Bulbasaur', imagen: '/bulbasaur.png', emparejada: false, volteada: false },
  ];

  const [cartasSeleccionadas, setCartasSeleccionadas] = useState<number[]>([]);
  const [cartasEmparejadas, setCartasEmparejadas] = useState<number[]>([]);
  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_INICIAL);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  
  const [clicks, setClicks] = useState(0);  // <-- Estado clicks añadido

  // Contador de puntuación = pares encontrados
  const puntuacion = cartasEmparejadas.length / 2;

  // Efecto para contar tiempo
  useEffect(() => {
    if (tiempoRestante <= 0) {
      setJuegoTerminado(true);
      return;
    }

    if (juegoTerminado) return;

    const timer = setTimeout(() => {
      setTiempoRestante(tiempoRestante - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tiempoRestante, juegoTerminado]);

  // Control de selección de cartas y emparejamiento
  useEffect(() => {
    if (cartasSeleccionadas.length === 2) {
      const [primera, segunda] = cartasSeleccionadas;

      if (primera === segunda) {
        // Evitar doble clic sobre misma carta
        setTimeout(() => {
          setCartasSeleccionadas([]);
        }, 1000);
        return;
      }

      const timeout = setTimeout(() => {
        // Se comparan las cartas por id de par (mitad del id si se duplican)
        const mismaCarta = Math.floor(primera / 2) === Math.floor(segunda / 2);

        if (mismaCarta) {
          setCartasEmparejadas((prev) => [...prev, primera, segunda]);
        }
        setCartasSeleccionadas([]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [cartasSeleccionadas]);

  const seleccionarCarta = (id: number) => {
    if (
      cartasSeleccionadas.length < 2 &&
      !cartasSeleccionadas.includes(id) &&
      !cartasEmparejadas.includes(id) &&
      !juegoTerminado
    ) {
      setCartasSeleccionadas((prev) => [...prev, id]);
      setClicks((c) => c + 1);  // <-- Aquí sumamos 1 click cada vez que seleccionas una carta
    }
  };

  const cartaVolteada = (id: number) =>
    cartasSeleccionadas.includes(id) || cartasEmparejadas.includes(id);
  const cartaEmparejada = (id: number) => cartasEmparejadas.includes(id);

  const reiniciarJuego = () => {
    setCartasSeleccionadas([]);
    setCartasEmparejadas([]);
    setTiempoRestante(TIEMPO_INICIAL);
    setJuegoTerminado(false);
    setClicks(0);  // <-- Reiniciar clicks al reiniciar juego
  };

  return (
    <JuegoContext.Provider
      value={{
        cartas,
        seleccionarCarta,
        cartaVolteada,
        cartaEmparejada,
        reiniciarJuego,
        puntuacion,
        tiempoRestante,
        juegoTerminado,
        clicks,      // <-- Pasamos clicks en el contexto
      }}
    >
      {children}
    </JuegoContext.Provider>
  );
}
