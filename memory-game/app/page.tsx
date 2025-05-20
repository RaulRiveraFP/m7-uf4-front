'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  function handleGoToGame() {
    router.push('/juego')
  }

  return (
    <div>
      <h1>Bienvenido a Memory Game</h1>
      <button 
        onClick={handleGoToGame} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Ir al Juego
      </button>
    </div>
  )
}
