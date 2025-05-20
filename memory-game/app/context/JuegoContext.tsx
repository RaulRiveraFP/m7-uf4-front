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

const TIEMPO_INICIAL = 200; // segundos
const NUM_POKEMONS = 3;

function generarIdsAleatorios(cantidad: number, max: number): number[] {
  const ids = new Set<number>();
  while (ids.size < cantidad) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(ids);
}

function mezclarArray<T>(array: T[]): T[] {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function JuegoProvider({ children }: Props) {
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState<number[]>([]);
  const [cartasEmparejadas, setCartasEmparejadas] = useState<number[]>([]);
  const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_INICIAL);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    if (!clientReady) return;

    async function cargarCartasDesdeAPI() {
      try {
        const idsAleatorios = generarIdsAleatorios(NUM_POKEMONS, 151);
        const promesas = idsAleatorios.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
        );
        const datos = await Promise.all(promesas);

        const nuevasCartas: Carta[] = datos.flatMap((pokemon, index) => {
          const cartaBase = {
            nombre: pokemon.name,
            imagen: pokemon.sprites.front_default,
            emparejada: false,
            volteada: false,
          };

          return [
            { ...cartaBase, id: index * 2 },
            { ...cartaBase, id: index * 2 + 1 },
          ];
        });

        const mezcladas = mezclarArray(nuevasCartas);
        setCartas(mezcladas);
      } catch (err) {
        console.error('Error cargando pokémons:', err);
      }
    }

    cargarCartasDesdeAPI();
  }, [clientReady]);

  useEffect(() => {
    if (tiempoRestante <= 0) {
      setJuegoTerminado(true);
      return;
    }

    if (juegoTerminado) return;

    const timer = setTimeout(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tiempoRestante, juegoTerminado]);

  // 👉 ESTA ES LA PARTE MODIFICADA
  useEffect(() => {
    if (cartasSeleccionadas.length === 2) {
      const [id1, id2] = cartasSeleccionadas;
      const carta1 = cartas.find((c) => c.id === id1);
      const carta2 = cartas.find((c) => c.id === id2);

      if (!carta1 || !carta2) return;

      const esEmparejada = carta1.nombre === carta2.nombre;

      const timeout = setTimeout(() => {
        if (esEmparejada) {
          setCartasEmparejadas((prev) => [...prev, id1, id2]);
        }
        setCartasSeleccionadas([]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [cartasSeleccionadas, cartas]);
  // 👆 FIN DE LA PARTE MODIFICADA

  const seleccionarCarta = (id: number) => {
    if (
      cartasSeleccionadas.length < 2 &&
      !cartasSeleccionadas.includes(id) &&
      !cartasEmparejadas.includes(id) &&
      !juegoTerminado
    ) {
      setCartasSeleccionadas((prev) => [...prev, id]);
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
    setCartas([]);
    setClientReady(false);
    setTimeout(() => setClientReady(true), 10);
  };

  const puntuacion = cartasEmparejadas.length / 2;

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
      }}
    >
      {children}
    </JuegoContext.Provider>
  );
}
