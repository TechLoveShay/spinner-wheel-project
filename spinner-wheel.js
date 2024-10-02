"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import confetti from 'canvas-confetti'

export default function SpinnerWheel() {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState('')
  const [rotation, setRotation] = useState(0)

  const options = [
    { emoji: '🍕' },
    { emoji: '❄️' },
    { emoji: '🍕' },
    { emoji: '❄️' },
    { emoji: '🍕' },
    { emoji: '❄️' },
    { emoji: '🍕' },
    { emoji: '❄️' }
  ]

  const spinWheel = () => {
    setSpinning(true)
    const newRotation = Math.floor(Math.random() * 360) + 1440 // At least 4 full rotations
    setRotation(newRotation)
    
    setTimeout(() => {
      setSpinning(false)
      const selectedIndex = Math.floor(((360 - (newRotation % 360)) / 45) % 8)
      setResult(options[selectedIndex].emoji === '🍕' ? 'Pizza' : 'HVAC')
      triggerConfetti()
    }, 5000) // 5 seconds for the wheel to stop
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="relative w-96 h-96 mb-8">
        <div 
          className={`w-full h-full rounded-full border-8 border-yellow-300 shadow-lg overflow-hidden transition-transform duration-5000 ease-out ${spinning ? 'spinning' : ''}`} 
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {options.map((option, index) => (
            <div 
              key={index} 
              className="absolute w-full h-full"
              style={{ 
                clipPath: `polygon(50% 50%, 100% 0, 100% 100%, 50% 50%)`,
                transform: `rotate(${index * 45}deg)`,
                backgroundColor: index % 2 === 0 ? '#FF6B6B' : '#4ECDC4'
              }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-5xl">{option.emoji}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-1/2 w-0 h-0 -mt-1 -ml-3 border-l-[12px] border-r-[12px] border-t-[24px] border-l-transparent border-r-transparent border-t-yellow-500"></div>
      </div>
      <Button 
        onClick={spinWheel} 
        disabled={spinning}
        className="px-8 py-4 text-2xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full shadow-lg transform hover:scale-105 transition-all"
      >
        SPIN
      </Button>
      {result && (
        <p className="mt-8 text-3xl font-bold text-white animate-bounce">
          Result: {result} {result === 'Pizza' ? '🍕' : '❄️'}
        </p>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinning {
          animation: spin 5s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
      `}</style>
    </div>
  )
}
